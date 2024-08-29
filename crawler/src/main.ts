import { RequestQueue, CheerioCrawler } from 'crawlee';

import sqlite3 from 'sqlite3';
import fs from 'fs';

// We use a config.json so it's easier to change the domain we want to start crawling from
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const startingDomain = config.domain;
const stratingURL = config.startingURL;

const db = new sqlite3.Database('crawler.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }

  console.log('Connected to the SQLite database.');
});

console.log('Opening request queue');
const requestQueue = await RequestQueue.open();
console.log('Preparing statement');
const statement = db.prepare('INSERT OR IGNORE INTO page (url) VALUES (?)');

const socialMediaDomains = [
  'facebook.com',
  'twitter.com',
  'linkedin.com',
  'instagram.com',
  'pinterest.com',
  'youtube.com',
  'tiktok.com',
  'snapchat.com',
  'reddit.com',
  'x.com',
  'threads.net',
  'bsky.app',
];

// Block any adult content
const blockedWords = [
  'casino',
  'gambling',
  'bet',
  'poker',
  'slots',
  'sex',
  'porn',
  'xxx',
  'adult',
  'nude',
];

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    // console.log('invalid URL:', url);
    return false;
  }
}

const crawler = new CheerioCrawler({
  requestQueue,
  maxRequestRetries: 3,
  errorHandler: (error) => {
    console.error('Error:', error);
  },
  async requestHandler({ $, request }) {
    console.log('Crawling:', request.loadedUrl);

    const links = $('a[href]')
      .map((_, el) => $(el).attr('href'))
      .get()
      .map((link) => {
        return new URL(link, request.loadedUrl).href;
      })
      .filter(isValidUrl);

    const safeLinks = links.filter((link) => {
      return (
        !socialMediaDomains.some((domain) => link.includes(domain)) &&
        !blockedWords.some((word) => link.includes(word))
      );
    });

    const externalLinks = safeLinks.filter(
      (link: string) => !link.includes(startingDomain)
    );

    console.log('External links:', externalLinks.length);

    externalLinks.forEach((link) => {
      statement.run(link, (err) => {
        if (err) {
          console.error('Error inserting link into SQLite:', err.message);
        }
      });
    });

    await crawler.addRequests(safeLinks);
  },
});

console.log('Request queue len', requestQueue.getTotalCount());

const isEmpty = process.env.CRAWLEE_PURGE_ON_START !== '0';

console.log('isEmpty:', process.env.CRAWLEE_PURGE_ON_START);

if (isEmpty) {
  console.log('Starting with seed URLs');
  await crawler.run([stratingURL]);
} else {
  console.log('Resuming from the queue');
  await crawler.run();
}

statement.finalize();
db.close((err) => {
  if (err) {
    console.error('Error closing database', err);
  } else {
    console.log('Database closed.');
  }
});
