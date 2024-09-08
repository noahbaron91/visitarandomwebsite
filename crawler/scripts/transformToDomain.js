/**
 * Converts database from full URLs to hostnames only
 */

import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const db = new sqlite3.Database('../../backup/backup-2.db', (err) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log('Connected to the database.');
});

const getURL = (url) => {
  try {
    return new URL(url);
  } catch (err) {
    return null;
  }
};

const ROWS_PER_PAGE = 10000;

const run = promisify(db.run.bind(db));
const get = promisify(db.get.bind(db));
const all = promisify(db.all.bind(db));

db.serialize(async () => {
  try {
    await run('BEGIN');

    await run(
      'CREATE TABLE IF NOT EXISTS page_2 (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL UNIQUE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);'
    );

    const { count } = await get('SELECT COUNT(*) as count FROM page');

    const pages = Math.ceil(count / ROWS_PER_PAGE);

    for (let i = 0; i < pages; i++) {
      console.log(`Processing page ${i + 1} of ${pages}`);

      const rows = await all(
        `SELECT * FROM page LIMIT ${ROWS_PER_PAGE} OFFSET ${i * ROWS_PER_PAGE}`
      );

      const promises = rows.map((row) => {
        const url = getURL(row.url);

        const isValidProtocol =
          url.protocol === 'http:' || url.protocol === 'https:';

        if (!url || !isValidProtocol) {
          return;
        }

        const combined = `${url.protocol}//${url.hostname}`;

        return run(`INSERT OR IGNORE INTO page_2 (url) VALUES (?)`, combined);
      });

      await Promise.all(promises);
    }

    console.log('Finished converting!');
    await run('COMMIT');
  } catch (error) {
    console.error(error);
    await run('ROLLBACK');
  }
});
// create a new table page_2
// wrap in transaction

// const pageCount = db
//   .prepare('SELECT COUNT(*) as count FROM page')
//   .get((err, data) => {
//     console.log('done', data);
//   });
