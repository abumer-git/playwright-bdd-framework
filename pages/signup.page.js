// @ts-check
class SignupPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#sign-username');
        this.passwordField = page.locator('#sign-password');
        this.signupButton = page.locator("//button[contains(@onclick,'register') and normalize-space(.)='Sign up']");
    }

    async signup(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);

        // handle popup
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });

        await this.signupButton.click();

        // wait until modal disappears
        await this.page.waitForSelector('#signInModal', { state: 'hidden' });
    }
}

module.exports = { SignupPage };
// use this class in steps file