import type { APIContext, APIRoute } from 'astro';

const isValid = (visitedDomains: string[], url: string) => {
  if (!isValidURLPattern(url)) return false;

  const hasAlreadyVisited = visitedDomains.includes(new URL(url).hostname);

  return !hasAlreadyVisited;
};

const isValidURLPattern = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const getURL = async (db: any, numberOfRows: number) => {
  const statement = await db.prepare(
    'SELECT * FROM page WHERE id = (ABS(RANDOM()) % (SELECT MAX(id) FROM page)) + 1 LIMIT 1'
  );

  const result = await statement.first();

  if (!result) {
    return null;
  }

  return result.url;
};

const MAX_TRIES = 150;

const getValidURL = async (
  db: any,
  numberOfRows: number,
  visitedDomains: string[]
) => {
  let url = await getURL(db, numberOfRows);

  let tries = 0;

  while (!isValid(visitedDomains, url) && tries < MAX_TRIES) {
    try {
      url = await getURL(db, numberOfRows);

      tries++;
    } catch {
      tries++;
    }
  }

  if (tries >= MAX_TRIES) {
    return null;
  }

  return url;
};

const getBody = async (ctx: APIContext) => {
  try {
    return await ctx.request.json();
  } catch {
    return null;
  }
};

export const PUT: APIRoute = async (ctx) => {
  const body = await getBody(ctx);

  if (!body) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to parse body',
      }),
      { status: 400 }
    );
  }

  const visitedDomains = body.visitedDomains as string[] | undefined;

  if (!visitedDomains || typeof visitedDomains !== 'object') {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Missing visitedDomains in body',
      }),
      { status: 400 }
    );
  }

  const NUMBER_OF_ROWS = Number(ctx.locals.runtime.env.NUMBER_OF_ROWS) ?? 1;

  const db = ctx.locals.runtime.env.DB;

  const validURL = await getValidURL(db, NUMBER_OF_ROWS, visitedDomains);

  if (!validURL) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'No valid URL found',
      }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      url: validURL,
    }),
    { status: 200 }
  );
};
