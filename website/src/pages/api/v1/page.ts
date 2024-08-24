import type { APIRoute } from 'astro';

export const GET: APIRoute = async (ctx) => {
  const db = ctx.locals.runtime.env.DB;
  const statement = await db.prepare('SELECT * FROM page LIMIT 1');

  const result = await statement.first();

  return new Response(
    JSON.stringify({
      success: true,
      url: result.url,
    }),
    { status: 200 }
  );
};
