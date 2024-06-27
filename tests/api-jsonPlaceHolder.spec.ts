import { test, expect } from '@playwright/test';


test('GET request example', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(await response.json());
    console.log(await response.headers());
    expect(response.status()).toBe(200);


});

test('POST request example', async ({ request }) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            "userId": 100,
            "id": 100,
            "title": "title1totest",
            "body": "BODYTEST"

        }
    });
    
    console.log(await response.json());
    expect(response.status()).toBe(201);
});
