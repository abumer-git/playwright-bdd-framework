// @ts-check
class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.locator("//button[contains(@onclick,'logIn') and normalize-space(.)='Log in']");
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForSelector('#logInModal', { state: 'hidden' });
    }
}

module.exports = { LoginPage };
