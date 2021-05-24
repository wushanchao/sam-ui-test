const defaultBrowserConfig = {
  headless: false,
  slowMo: 200,
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  args: [
    "--window-size=1920,1080",
    "--disable-extensions",
    // '--disable-gpu-sandbox',
    // '–single-process',
    // '–-disable-gpu=true',
    // '–-disable-dev-shm-usage',
    // '–-disable-setuid-sandbox',
    // '–-no-first-run',
    // '–-no-sandbox',
    // '–-no-zygote',
    // '–-single-process'
  ],
};

module.exports = defaultBrowserConfig;