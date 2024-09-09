import { RequestQueue, CheerioCrawler } from 'crawlee';

import sqlite3 from 'sqlite3';
import fs from 'fs';

// We use a config.json so it's easier to change the domain we want to start crawling from
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const startingDomain = config.domain;
const stratingURL = config.startingURL;

const db = new sqlite3.Database('crawler.db', (err) => {
  if (err) {
    console.error(
      'Error opening database. Make sure you have created a crawler.db sqlite database.',
      err
    );
    process.exit(1);
  }

  console.log('Connected to the SQLite database.');
});

const statement = db.prepare('INSERT OR IGNORE INTO page (url) VALUES (?)');

const blockedWebsites = [
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
  'amazon',
  'audible',
  'wikipedia',
  'pinterest.com',
  'wikimedia',
  'wiktionary',
  'stripe.com',
  'dan.com',
  'github.com',
  'github.com',
  'archive.org',
  'ebay.com',
  'booking.com',
];

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
  'naked',
  'erotic',
  'nude',
  'share',
  '.rdf',
  '.mp3',
  '.png',
  '.jpg',
  '.webp',
  '.avif',
  '.svg',
  // .mp4 kept on purpose since they're quite fun to stumble upon
];

function isValidUrl(url: string) {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

const getDomainFromURL = (url: string): string | null => {
  try {
    const urlObject = new URL(url);

    if (urlObject.protocol !== 'https:' && urlObject.protocol !== 'http:')
      return null;

    return `${urlObject.protocol}//${urlObject.hostname}`;
  } catch (error) {
    return null;
  }
};

function checkIfDomainExists(domain: string) {
  const promise = new Promise<{ exists: boolean; domain: string }>(
    (resolve) => {
      db.get('SELECT * FROM page WHERE url = ?', domain, (err, row) => {
        if (err) {
          console.error('Error querying SQLite:', err);
          resolve({ exists: false, domain });
        }

        resolve({
          exists: !!row,
          domain,
        });
      });
    }
  );

  return promise;
}

const insertIntoDatabase = async (url: string) => {
  const promise = new Promise<void>((resolve, reject) => {
    db.run('INSERT INTO page (url) VALUES (?)', url, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

  return promise;
};

const getLast1kCrawledURLs = () => {
  try {
    const last1kCrawledURLs = fs
      .readFileSync('crawled-urls.csv', 'utf8')
      .split('\n')
      .slice(-1000)
      .filter((url) => url !== '');

    return last1kCrawledURLs;
    // Will throw an error if crawled-urls.csv is empty
  } catch {
    return [];
  }
};

const crawlWebsites = async () => {
  const requestQueue = await RequestQueue.open();

  const crawler = new CheerioCrawler({
    requestQueue,
    maxRequestRetries: 3,
    maxRequestsPerCrawl: 1000,
    errorHandler: () => {},
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
          !blockedWebsites.some((domain) => link.includes(domain)) &&
          !blockedWords.some((word) => link.includes(word))
        );
      });

      const externalLinks = safeLinks.filter(
        (link: string) => !link.includes(startingDomain)
      );

      const externalLinkDomains = externalLinks
        .map(getDomainFromURL)
        .filter((domain) => !!domain) as string[];

      const uniqueExternalLinkDomains = [...new Set(externalLinkDomains)];

      const domainsExistPromises = uniqueExternalLinkDomains.map((link) =>
        checkIfDomainExists(link)
      );

      const domainsExistResults = await Promise.all(domainsExistPromises);

      const domainsThatDontExistsInDB = domainsExistResults
        .filter((result) => !result.exists)
        .map(({ domain }) => domain);

      const rankingsCSV = fs.readFileSync('top-1m.csv', 'utf8').split('\n');

      const domainsThatArentInTheTopMillion = domainsThatDontExistsInDB.filter(
        (domain) => {
          // The domain includes the protocol so we need to check if the domain includes the line not the other way around
          return !rankingsCSV.some((line) => {
            const domainWithoutProtocol = domain.replace(/(^\w+:|^)\/\//, '');

            return domainWithoutProtocol === line;
          });
        }
      );

      const insertPromises = domainsThatArentInTheTopMillion.map((domain) =>
        insertIntoDatabase(domain)
      );

      await Promise.all(insertPromises);

      const data = domainsThatArentInTheTopMillion
        .map((domain, i) => (i === 0 ? `\n${domain}` : domain))
        .join('\n');

      fs.appendFileSync('crawled-urls.csv', data);

      await crawler.addRequests(safeLinks);
    },
  });

  const last1kCrawledURLs = getLast1kCrawledURLs();

  fs.writeFileSync('crawled-urls.csv', '');

  // It will have the length of 1 if the file is empty ('')
  const initialSeedURLs =
    last1kCrawledURLs.length > 1 ? last1kCrawledURLs : [stratingURL];

  await crawler.run(initialSeedURLs);

  await requestQueue.drop();

  await crawlWebsites();
};

try {
  await crawlWebsites();
  console.log('Crawling finished');
} catch (error) {
  console.log('Crawling error:', error);
}

statement.finalize();

db.close((err) => {
  if (err) {
    console.error('Error closing database', err);
  } else {
    console.log('Database closed.');
  }
});
