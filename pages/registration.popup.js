class RegistrationPopup {
    constructor(page) {
        this.page = page;
        this.popup = '.registration-popup'; // Обновите селектор в соответствии с вашим сайтом
        this.emailInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.submitButton = 'button[type="submit"]';
        this.closeButton = 'button.close-popup';
    }

    async fillRegistrationForm(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    async closePopup() {
        await this.page.click(this.closeButton);
    }

    async verifyPopupIsVisible() {
        await this.page.waitForSelector(this.popup);
    }
}

module.exports = { RegistrationPopup };
