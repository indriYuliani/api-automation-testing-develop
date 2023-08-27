const request = require('supertest');
const API_CONFIG = require('../appLanding');
const { submitId } = require('../data/submitId.js');
const {Base_Url, list_submit, merchant_key, User_Token} = API_CONFIG
describe('List Submit Applicant', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_submit}`)
    .set('Authorization',`Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    const data = response.body.data[0].applicant_id;
    console.log(data)

    await submitId(data)
  });
  it('Failed status 422', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_submit}`)
    .set('Authorization',`Bearer ${User_Token}`);

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('invalid parameter');
  });
  it('Failed status 401', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_submit}`)
    .set('Authorization',`Bearer `);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Authentication failure');
  });
  it('Failed status 404', async () => {
    const response = await request(`${Base_Url}`)
    .get('ssubmit-applicant/list?page=3&per_page=10')
    .set('Authorization',`Bearer `);

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});