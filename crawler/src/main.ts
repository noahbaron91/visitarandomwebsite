import { RequestQueue, CheerioCrawler } from 'crawlee';

import fs from 'fs';
import https from 'https';
import sqlite3 from 'sqlite3';
import { MemoryStorage } from '@crawlee/memory-storage';

const db = new sqlite3.Database('crawler.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }

  console.log('Connected to the SQLite database.');
});

let blockedDomains: string[] = [];

// Download and save txt files of banned domains
// From: https://blocklistproject.github.io/Lists/
const downloadBlockList = (): Promise<void> => {
  const file = fs.createWriteStream('block-list.txt');

  const promise = new Promise<void>((resolve) => {
    https.get(
      'https://blocklistproject.github.io/Lists/everything.txt',
      (response) => {
        response.pipe(file);
        file.on('finish', () => {
          console.log('Download Completed');
          file.close();
          resolve();
        });
      }
    );
  });

  return promise;
};

const requestQueue = await RequestQueue.open();

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
    console.log('invalid URL:', url);
    return false;
  }
}

const crawler = new CheerioCrawler({
  requestQueue,
  maxRequestRetries: 3,
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
      (link: string) => !link.includes('blogs-collection.com')
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

// await downloadBlockList();

// const blockListFile = fs.readFileSync('block-list.txt', 'utf-8');
// const lines = blockListFile.trim().split('\n');

// const linesWithoutComments = lines.filter((line) => !line.startsWith('#'));

// Extract blocked domains from the block list
// const blockedDomainsWithDuplicates = linesWithoutComments.map((line) => {
//   // Split each line by space and take the second part (domain)
//   return line.split(' ')[1];
// });

// blockedDomains = [...new Set(blockedDomainsWithDuplicates)];

// const isEmpty = await requestQueue.isEmpty();
// console.log('Queue is empty:', isEmpty);

const isEmpty = process.env.CRAWLEE_PURGE_ON_START !== '0';

console.log('isEmpty:', process.env.CRAWLEE_PURGE_ON_START);

if (isEmpty) {
  console.log('Starting with seed URLs');
  await crawler.run(['https://www.blogs-collection.com/']);
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
