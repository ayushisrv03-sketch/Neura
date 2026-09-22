import "dotenv/config";
import { COOKIE_NAME } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerLocalAuthRoutes } from "./authLocal";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { sdk } from "./sdk";
import { serveStatic, setupVite } from "./vite";

// Path prefixes that require a signed-in session. Anyone requesting one of
// these pages without a valid `app_session_id` cookie is redirected to
// /login before the SPA (Vite dev middleware or the built static files) ever
// serves a response, so a protected page never briefly flashes its content
// on a fresh/direct page load. Client-side navigation is separately guarded
// by <DashboardLayout>, which covers in-app (non-reloading) navigation.
const PROTECTED_PATH_PREFIXES = ["/dashboard"];

function requiresAuth(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

async function guardProtectedPages(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method !== "GET" || !requiresAuth(req.path)) {
    next();
    return;
  }

  const cookies = parseCookieHeader(req.headers.cookie ?? "");
  const session = await sdk.verifySession(cookies[COOKIE_NAME]);
  if (!session) {
    res.redirect(302, `/login?next=${encodeURIComponent(req.originalUrl)}`);
    return;
  }
  next();
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  console.log("[Server] Initializing Express app...");
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerLocalAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Server-side gate for direct/full-page loads of protected routes (see
  // guardProtectedPages above). Must run before Vite/static serving so an
  // unauthenticated request never receives the dashboard's HTML.
  app.use(guardProtectedPages);
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    console.log("[Server] Configuring Vite middleware...");
    await setupVite(app, server);
    console.log("[Server] Vite middleware configured.");
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
