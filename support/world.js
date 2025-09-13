const { chromium } = require('playwright');
const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
    async init() {
        this.browser = await chromium.launch({
            headless: process.env.CI ? true : false, // Headless on CI, headed locally
            args: ['--start-maximized'] // optional: open maximized
        });
        this.context = await this.browser.newContext({
            viewport: null // optional: disables default 1280x720 viewport
        });
        this.page = await this.context.newPage();
    }

    async close() {
        await this.page.close();
        await this.context.close();
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);
