import puppeteer from 'puppeteer';
import { expect } from 'chai';
import {
  listen,
  close,
  gotMessage
} from '../test-server/index.js';

let browser, page;
const TEST_URL = 'http://127.0.0.1:8081/index.html';

function wait(time) {
  return new Promise((r) => {
    setTimeout(r, time);
  });
}

describe('Closing tab', () => {
  before(async () => {
    await listen();
  })

  after (async () => {
    await close();
  })

  beforeEach (async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  })

  afterEach (async () => {
    await browser.close();
  })

  it('should post on window.onbeforeunload', async () => {
    await page.goto(TEST_URL);
    expect(await gotMessage()).to.be.false;

    await page.close({runBeforeUnload: true});
    await wait(5000);
    expect(await gotMessage()).to.be.true;
  });
});