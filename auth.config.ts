import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Empty here, added in main auth.ts
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to /admin/login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
