import type { APIRoute } from 'astro';

export const GET: APIRoute = async (ctx) => {
  const db = ctx.locals.runtime.env.DB;
  const NUMBER_OF_ROWS = ctx.locals.runtime.env.NUMBER_OF_ROWS;

  const statement = await db
    .prepare('SELECT * FROM page LIMIT 1 OFFSET ABS(RANDOM()) % ?1')
    .bind(NUMBER_OF_ROWS);

  const result = await statement.first();

  return new Response(
    JSON.stringify({
      success: true,
      url: 'https://example.com',
    }),
    { status: 200 }
  );
};
