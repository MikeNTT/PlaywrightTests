import { test, expect } from '@playwright/test';
import { beforeEach, describe } from 'node:test';
import { TrelloApi} from '../POM/TrelloApi.ts';

describe('API Trello Board tests', () => {
    const trelloApis = new TrelloApi();
//Crear mas casos negativos
    test('POST - Create a Board', async ({ request }) => {
        
        const url = trelloApis.createNewBoard('BoardForTesting_2');
        const response = await request.post(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
        //Crear mas validaciones del bodyResponse
    });


    test('GET a board', async ({ request }) => {
         
        const url = trelloApis.getABoard('6671a2d96093c105cc76e852');
        const response = await request.get(url)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200);
        console.log(await response.json());
        expect(responseBody.id).toBe('6671a2d96093c105cc76e852')
        expect(responseBody.name).toBe('BoardForTEST')

    });

    test('PUT - update a board', async ({ request }) => {
         
        const url = trelloApis.updateBoard('6671a2d96093c105cc76e852', 'BoardForTEST');
        const response = await request.put(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });


    test('DELETE - Delete a board', async ({ request }) => {
     
        const url = trelloApis.deleteBoard('');
        const response = await request.delete(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    /////////////////////////////////////////////////////////   LIST APIS       //////////////////////////////////////////////////////////////////////
   
    test('POST - Create a List', async ({ request }) => {
     
        const url = trelloApis.createNewList('6671a2d96093c105cc76e852', 'TestingList');
        const response = await request.post(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('PUT - Update a List', async ({ request }) => {
     
        const url = trelloApis.updateList('', 'TestingListNameUpdated5');
        const response = await request.put(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('PUT - Archive a List', async ({ request }) => {
     
        const url = trelloApis.archiveAList('');
        const response = await request.put(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

//////////////////////////////////////////////////////////// CARDS //////////////////////////////////////////////////////////////////////

    test('POST - Create a card', async ({ request }) => {
     
        const url = trelloApis.createNewCard('6671a464161fafb971079c22', 'NewCard');
        const response = await request.post(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('DELETE - Delete a card', async ({ request }) => {
     
        const url = trelloApis.deleteCard('');
        const response = await request.delete(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    //////////////////////////////////////////////////////////// LABEL  //////////////////////////////////////////////////////////////////////
    
    test('POST - Create a Label', async ({ request }) => {
     
        const url = trelloApis.createNewLabel('newLabel', 'yellow', '6671a2d96093c105cc76e852');
        const response = await request.post(url)
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

});