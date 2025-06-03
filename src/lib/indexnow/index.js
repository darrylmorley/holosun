const https = require("https");
const http = require("http");
const { XMLParser } = require("fast-xml-parser");

class IndexNowSubmitter {
  constructor(options = {}) {
    this.key = options.key || process.env.INDEXNOW_KEY;
    this.keyLocation = options.keyLocation;
    this.host = options.host;
    this.engine = options.engine || "www.bing.com"; // Default to Bing
  }

  async fetchSitemap(sitemapUrl) {
    return new Promise((resolve, reject) => {
      const client = sitemapUrl.startsWith("https:") ? https : http;

      client
        .get(sitemapUrl, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  parseSitemap(xmlData) {
    const parser = new XMLParser();
    const result = parser.parse(xmlData);

    let urls = [];

    // Handle regular sitemap
    if (result.urlset && result.urlset.url) {
      const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];
      urls = urlEntries.map((entry) => entry.loc);
    }

    // Handle sitemap index
    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemapEntries = Array.isArray(result.sitemapindex.sitemap)
        ? result.sitemapindex.sitemap
        : [result.sitemapindex.sitemap];

      // Return sitemap URLs for further processing
      return sitemapEntries.map((entry) => entry.loc);
    }

    return urls;
  }

  async submitToIndexNow(urls) {
    if (!this.key) {
      throw new Error("IndexNow key is required");
    }

    const payload = {
      host: this.host,
      key: this.key,
      keyLocation: this.keyLocation,
      urlList: urls.slice(0, 10000), // IndexNow limit is 10,000 URLs per request
    };

    return new Promise((resolve, reject) => {
      const data = JSON.stringify(payload);

      const options = {
        hostname: this.engine,
        port: 443,
        path: "/indexnow",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = "";

        res.on("data", (chunk) => {
          responseData += chunk;
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            data: responseData,
          });
        });
      });

      req.on("error", (err) => {
        reject(err);
      });

      req.write(data);
      req.end();
    });
  }

  async processUrls(sitemapUrl) {
    try {
      console.log(`Fetching sitemap: ${sitemapUrl}`);
      const xmlData = await this.fetchSitemap(sitemapUrl);

      console.log("Parsing sitemap...");
      const urls = this.parseSitemap(xmlData);

      // Check if we got sitemap index entries
      if (urls.length > 0 && urls[0].includes(".xml")) {
        console.log("Found sitemap index, processing individual sitemaps...");
        let allUrls = [];

        for (const sitemapUrl of urls) {
          console.log(`Processing sitemap: ${sitemapUrl}`);
          const subXmlData = await this.fetchSitemap(sitemapUrl);
          const subUrls = this.parseSitemap(subXmlData);
          allUrls = allUrls.concat(subUrls);
        }

        return allUrls;
      }

      return urls;
    } catch (error) {
      console.error("Error processing URLs:", error);
      throw error;
    }
  }

  async submitSitemap(sitemapUrl) {
    try {
      const urls = await this.processUrls(sitemapUrl);

      console.log(`Found ${urls.length} URLs to submit`);

      if (urls.length === 0) {
        console.log("No URLs found in sitemap");
        return;
      }

      // Split into batches of 10,000 if necessary
      const batches = [];
      for (let i = 0; i < urls.length; i += 10000) {
        batches.push(urls.slice(i, i + 10000));
      }

      const results = [];
      for (let i = 0; i < batches.length; i++) {
        console.log(`Submitting batch ${i + 1}/${batches.length} (${batches[i].length} URLs)`);
        const result = await this.submitToIndexNow(batches[i]);
        results.push(result);

        console.log(`Batch ${i + 1} response:`, result.statusCode, result.statusMessage);

        // Add delay between batches to be respectful
        if (i < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return results;
    } catch (error) {
      console.error("Error submitting sitemap:", error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const submitter = new IndexNowSubmitter({
    key: "1ce0c153ca8641fca26b4de9222946c9",
    host: "www.holosun-optics.co.uk",
    keyLocation: "https://holosun-optics.co.uk/1ce0c153ca8641fca26b4de9222946c9.txt",
    engine: "api.indexnow.org",
  });

  try {
    await submitter.submitSitemap("https://www.holosun-optics.co.uk/sitemap.xml");
    console.log("Sitemap submission completed!");
  } catch (error) {
    console.error("Failed to submit sitemap:", error);
  }
}

// Export for use as module
module.exports = { IndexNowSubmitter };

// Run if called directly
if (require.main === module) {
  main();
}
