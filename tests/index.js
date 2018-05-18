import detectPort from 'detect-port';
import path from 'path';
import puppeteer from 'puppeteer';
import { createServer } from 'http-server';

let config = {
  port: 8080
};

let server = null;

beforeAll(async () => {
  config = await getConfig(config);
  server = createServer({
    root: path.resolve(__dirname, 'public')
  });
  await new Promise((resolve, reject) => {
    server.server.on('error', err => reject(err));
    server.listen(config.port, err => {
      if (err) return reject(err);
      // eslint-disable-next-line no-console
      console.log(`listening on port ${config.port}`);
      return resolve();
    });
  });
});

afterAll(() => {
  server.close();
});

describe('nestedIframe(query)', async () => {
  it('should find nested iframe', async () => {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || null,
      args: ['--no-sandbox', '--headless', '--disable-gpu'],
      ignoreHTTPSErrors: false
    });
    const page = await browser.newPage();
    page.on('console', message => {
      // eslint-disable-next-line no-console
      if (message._type) return console[message._type](message._text);
      // eslint-disable-next-line no-console
      return console.log(message);
    });
    await page.goto(`http://localhost:${config.port}`);
    const iframe = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const browserWindow = window;
      return new Promise(resolve => {
        browserWindow.setTimeout(
          () =>
            resolve(
              browserWindow.nestedIframe.contentDocument.getElementsByTagName(
                'h1'
              )[0].innerText
            ),
          2000
        );
      });
    });
    expect(iframe).toBe('Iframe 2');
  });
});

async function getConfig(config) {
  return {
    ...config,
    port: await detectPort(config.port)
  };
}
