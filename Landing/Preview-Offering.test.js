const request = require('supertest');
const API_CONFIG = require('../appLanding');
const {Base_Url, merchant_key, User_Token, preview}= API_CONFIG

describe('Preview Offering', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${preview}`)
    .set('Merchant-Key', `${merchant_key}`)
    .set('Authorization', `Bearer ${User_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('salary_offer');
    expect(response.body.message).toEqual('Get Offering Applicant Success');
  });
  it('Failed status 401', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${preview}`)
    .set('Merchant-Key', `${merchant_key}`)
    // .set('Authorization', `Bearer ${User_Token}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
  it('Failed status 404', async () => {
    const response = await request('https://api.aquarius.axeleration.id/webs')
    .get(`${preview}`)
    .set('Merchant-Key', `${merchant_key}`)
    .set('Authorization', `Bearer ${User_Token}`);

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});