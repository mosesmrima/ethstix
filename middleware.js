// middleware.js

export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        // Protect only these routes
        "/dashboard",
        "/another-protected-route",
        // Add other protected routes here
    ],
};
