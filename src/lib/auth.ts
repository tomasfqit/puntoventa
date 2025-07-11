import { GetServerSidePropsContext } from "next";

export function isAuthenticated(ctx: GetServerSidePropsContext): boolean {
  const cookie = ctx.req?.headers.cookie || "";
  return cookie.includes("auth=true");
}
