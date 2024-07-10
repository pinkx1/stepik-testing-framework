import { request, APIRequestContext } from '@playwright/test';

export class ApiHelper {
    static async getCsrfToken(requestContext: APIRequestContext) {
        await requestContext.get('https://stepik.org/learn?auth=registration');
        const cookies = await requestContext.storageState();
        const csrfToken = cookies.cookies.find(cookie => cookie.name === 'csrftoken')?.value;

        if (!csrfToken) {
            throw new Error('CSRF token not found');
        }

        return csrfToken;
    }

    static async createUser(email: string, password: string, firstName: string, lastName: string) {
        const requestContext = await request.newContext();
        const csrfToken = await ApiHelper.getCsrfToken(requestContext);

        const response = await requestContext.post('https://stepik.org/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'Referer': 'https://stepik.org/learn?auth=registration'
            },
            data: {
                user: {
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        const data = await response.json();
        if (!response.ok()) {
            throw new Error(`Failed to create user: ${data.detail || 'Unknown error'}`);
        }
        return data;
    }


    static async deleteUser(email: string, password: string) {
        const requestContext = await request.newContext();
        const csrfToken = await ApiHelper.getCsrfToken(requestContext);
        const cookies = await requestContext.storageState();
        const sessionidCookie= cookies.cookies.find(cookie => cookie.name === 'sessionid')?.value;

        const response = await requestContext.post('https://stepik.org/users/delete-account/', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': `csrftoken=${csrfToken}; sessionid=${sessionidCookie}`,
                'origin': 'https://stepik.org',
                'priority': 'u=0, i',
                'referer': 'https://stepik.org/users/delete-account/',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            },
            data: `csrfmiddlewaretoken=${csrfToken}&password=${password}`,
        });
        // console.log(response)

    }
}