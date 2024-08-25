import { PlaywrightCrawler, RequestQueue } from 'crawlee';
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

const memoryStorage = new MemoryStorage({
  persistStorage: true,
  writeMetadata: false,
});

const requestQueue = await RequestQueue.open(null, {
  storageClient: memoryStorage,
});

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

const crawler = new PlaywrightCrawler({
  requestQueue,
  maxRequestRetries: 3,
  maxConcurrency: 15,
  errorHandler: async (error) => {
    console.error('Error:', error);
  },
  async requestHandler({ page, enqueueLinks }) {
    console.log('Processing:', page.url());

    const links = await page.$$eval('a', (anchors) =>
      anchors.map((anchor) => anchor.href)
    );

    console.log('Links found:', links.length);

    const externalLinks = links.filter(
      (link: string) => !link.includes('blogs-collection.com')
    );

    const safeLinksToSave = externalLinks.filter(
      (link: string) =>
        !socialMediaDomains.some((domain) => link.includes(domain)) &&
        !blockedWords.some((word) => link.includes(word))
    );

    safeLinksToSave.forEach((link) => {
      statement.run(link, (err) => {
        if (err) {
          console.error('Error inserting link into SQLite:', err.message);
        }
      });
    });

    const safeLinksToCrawl = links.filter((link) => {
      return (
        !socialMediaDomains.some((domain) => link.includes(domain)) &&
        !blockedWords.some((word) => link.includes(word))
      );
    });

    await enqueueLinks({ urls: safeLinksToCrawl });
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

const isEmpty = await requestQueue.isEmpty();
console.log('Queue is empty:', isEmpty);

if (isEmpty) {
  console.log('Starting with seed URLs');
  await crawler.run(['https://www.blogs-collection.com/']);
} else {
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
