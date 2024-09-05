import type { APIRoute } from 'astro';

const isValidURLPattern = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isWebsiteAvailable = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const isValidURL = async (url: string) => {
  const isValidPattern = isValidURLPattern(url);
  // const isAvailable = await isWebsiteAvailable(url);

  return isValidPattern;
};

const getURL = async (db: any, numberOfRows: number) => {
  const statement = await db.prepare(
    'SELECT * FROM page WHERE id = (ABS(RANDOM()) % (SELECT MAX(id) FROM page)) + 1 LIMIT 1'
  );

  const result = await statement.first();
  console.log(result);
  if (!result) {
    return null;
  }

  return result.url;
};

const getValidURL = async (db: any, numberOfRows: number) => {
  let url = await getURL(db, numberOfRows);

  let tries = 0;

  while (!(await isValidURL(url)) && tries < 10) {
    try {
      url = await getURL(db, numberOfRows);
      console.log({ url });
      tries++;
    } catch {
      tries++;
    }
  }

  if (tries >= 10) {
    return null;
  }

  return url;
};

export const GET: APIRoute = async (ctx) => {
  const NUMBER_OF_ROWS = Number(ctx.locals.runtime.env.NUMBER_OF_ROWS) ?? 1;

  const db = ctx.locals.runtime.env.DB;

  // console.time('query');
  console.log('is here 1');
  const validURL = await getValidURL(db, NUMBER_OF_ROWS);
  // console.timeEnd('query');
  console.log('is here 2');

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
