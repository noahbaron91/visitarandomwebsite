import type { APIRoute } from 'astro';

export const GET: APIRoute = (ctx) => {
  return new Response(
    JSON.stringify({
      success: true,
      url: 'https://www.timeanddate.com/stopwatch/',
    }),
    { status: 200 }
  );
};
