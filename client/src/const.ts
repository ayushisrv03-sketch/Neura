export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// The dashboard originally called this to kick off Manus's hosted OAuth
// portal, which only exists inside the Manus platform. It's now a thin
// redirect into our own local /login page (see AuthPage.tsx +
// server/_core/authLocal.ts for the real email/password flow). Kept as a
// named export so every existing call site (DashboardLayout's guest menu,
// redirectToLoginIfUnauthorized below) needed no other changes.
export const startLogin = () => {
  window.location.href = "/login";
};
