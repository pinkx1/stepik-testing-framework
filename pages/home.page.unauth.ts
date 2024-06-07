class HomePageUnauth {
    constructor(page, isMobile) {
        this.page = page;
        this.isMobile = isMobile;
        this.loginButton = isMobile ? 'button.login-mobile' : 'button.login';
        this.signUpButton = isMobile ? 'button.signup-mobile' : 'button.signup';
    }

    async goto() {
        await this.page.goto('https://example.com');
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async clickSignUp() {
        await this.page.click(this.signUpButton);
    }

    async verifyHomePage() {
        await this.page.waitForSelector(this.loginButton);
        await this.page.waitForSelector(this.signUpButton);
    }
}

module.exports = { HomePageUnauth };
