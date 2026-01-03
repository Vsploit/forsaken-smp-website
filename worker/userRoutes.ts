import { Hono } from "hono";
import type { MiddlewareHandler } from 'hono';
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.use('*', async (c, next) => {
        const pathname = new URL(c.req.url).pathname;
        if (pathname === '/api/apply' || pathname === '/api/test' || pathname === '/api/test-webhook') {
            return c.env.ASSETS.fetch(c.req.raw, (c.req as any).cf ?? undefined);
        }
        return next();
    });
}