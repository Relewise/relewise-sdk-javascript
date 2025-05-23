import { test } from '@jest/globals';
import { DataAccessor, UserQueryBuilder } from '../../../src';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const dataAccessor = new DataAccessor(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Query Users', async() => {

    const query = new UserQueryBuilder()
        .criteria(c => { 
            c.temporaryId("5d1c72f4-d8e4-4539-af6a-8c58050d0587")
            .authenticatedId("")
         } )
        .criteria(c => c.temporaryId("5d1c72f4-d8e4-4539-af6a-8c58050d0587"))
        .build();
    
    const result = await dataAccessor.queryUser(query);

    console.log(result?.results);
});