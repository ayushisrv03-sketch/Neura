import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { randomUUID } from "crypto";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { hashPassword, verifyPassword } from "./password";
import { sdk } from "./sdk";

/**
 * Local email/password authentication.
 *
 * The dashboard project this app is merged from authenticated exclusively
 * through Manus's hosted OAuth portal (see the removed `oauth.ts`): the
 * client redirected to `VITE_OAUTH_PORTAL_URL`, and the callback exchanged a
 * code for a token against a private `webdev.v1.WebDevAuthPublicService`
 * endpoint that only exists inside the Manus platform. That flow cannot run
 * in a standalone deployment, so it has been replaced with a self-contained
 * email/password flow below. Everything downstream of login is unchanged:
 * this still mints the same signed `app_session_id` JWT cookie
 * (`sdk.createSessionToken`) that `sdk.authenticateRequest` / the tRPC
 * context already verify on every request, so `trpc.auth.me`, `logout`, and
 * every dashboard query keep working exactly as before.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value);
}

export async function issueSession(req: Request, res: Response, user: { openId: string; name: string | null }) {
  const sessionToken = await sdk.createSessionToken(user.openId, {
    name: user.name || "",
    expiresInMs: ONE_YEAR_MS,
  });
  const cookieOptions = getSessionCookieOptions(req);
  res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
}

export function registerLocalAuthRoutes(app: Express) {
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body ?? {};

      if (typeof name !== "string" || !name.trim()) {
        res.status(400).json({ error: "Please tell us what to call you." });
        return;
      }
      if (!isValidEmail(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }
      if (typeof password !== "string" || password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters." });
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existing = await db.getUserByEmail(normalizedEmail);
      if (existing) {
        res.status(409).json({ error: "An account with that email already exists." });
        return;
      }

      const passwordHash = await hashPassword(password);
      const openId = `local:${randomUUID()}`;
      const user = await db.createLocalUser({ openId, name: name.trim(), email: normalizedEmail, passwordHash });
      if (!user) {
        res.status(500).json({ error: "Could not create your account. Is DATABASE_URL configured?" });
        return;
      }

      await issueSession(req, res, user);
      res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("[Auth] Signup failed", error);
      res.status(500).json({ error: "Something went wrong creating your account." });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body ?? {};

      if (!isValidEmail(email) || typeof password !== "string" || !password) {
        res.status(400).json({ error: "Please enter your email and password." });
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = await db.getUserByEmail(normalizedEmail);
      if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
        res.status(401).json({ error: "Incorrect email or password." });
        return;
      }

      await issueSession(req, res, user);
      res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Something went wrong signing you in." });
    }
  });
}
