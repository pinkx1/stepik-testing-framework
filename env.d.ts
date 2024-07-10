declare namespace NodeJS {
    interface ProcessEnv {
        readonly TEST_USER_EMAIL: string
        readonly TEST_USER_PASSWORD: string
        readonly VK_USER_PHONE_NUMBER: string
        readonly VK_USER_PASSWORD: string
    }
}