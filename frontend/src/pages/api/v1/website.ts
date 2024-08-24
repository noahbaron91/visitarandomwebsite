import type { APIRoute } from 'astro';

export const GET: APIRoute = (ctx) => {
  return new Response('Hello from the API!', { status: 200 });
};
