import type { APIRoute } from "astro";
import { config } from "@/config";

const robots = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-0.xml", config.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
