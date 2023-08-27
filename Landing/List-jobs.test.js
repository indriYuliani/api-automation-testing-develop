const request = require('supertest');
const API_CONFIG = require('../appLanding');
const { Base_Url, list_job, User_Token, merchant_key} = API_CONFIG

describe('List Jobs', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_job}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Failed status 422', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_job}`)
    .set('Authorization', `Bearer ${User_Token}`)
    // .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('invalid parameter');
  });
  it('Failed status 404', async () => {
    const response = await request(`https://api.aquarius.axeleration.id/webs`)
    .get(`${list_job}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
