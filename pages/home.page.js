// @ts-check
class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.signupButton = page.locator('#signin2');
        this.loginButton = page.locator('#login2');
        this.welcomeUser = page.locator('#nameofuser');
    }

    async open() {
        await this.page.goto('https://demoblaze.com/');
    }

    async openSignupModal() {
        await this.signupButton.waitFor({ state: 'visible' });
        await this.signupButton.click();
    }

    async openLoginModal() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
    }

    async getTitle() {
        return this.page.title();
    }

    async getLoggedInUsername() {
        await this.welcomeUser.waitFor({ state: 'visible' });
        return this.welcomeUser.innerText();
    }
}

module.exports = { HomePage };
