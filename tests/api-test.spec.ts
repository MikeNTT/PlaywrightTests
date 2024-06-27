import { test, expect } from '@playwright/test';
import { describe } from 'node:test';


describe('API reqres tests', () => {


    test('API POST Request', async ({ request }) => {
        //Crear POM para las URL 
        const response = await request.post('https://reqres.in/api/users', {
            data: {
                "name": "Miguel",
                "job": "QA Engineer"
            }
        })
        expect(response.status()).toBe(201);
        const text = await response.text();
        expect(text).toContain('Miguel');
        expect(text).toContain('QA Engineer');
        console.log(await response.json());
    });

    test('API PUT Request', async ({ request }) => {

        const response = await request.put('https://reqres.in/api/users/2', {
            data: {
                "name": "MiguelU",
                "job": "QA EngineerU"
            }
        })
        expect(response.status()).toBe(200);
        const text = await response.text();
        expect(text).toContain('Miguel');
        expect(text).toContain('QA Engineer');
        console.log(await response.json());
    });


    test('API GET Request', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/2');
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });


    test('API DELETE Request', async ({ request }) => {
        const response = await request.delete('https://reqres.in/api/users/2');
        expect(response.status()).toBe(204);
    });



});
