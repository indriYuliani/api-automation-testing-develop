const request = require('supertest');
const API_CONFIG = require('../appLanding')
const jobId = require('../data/jobId.json')
const {Base_Url, User_Token, merchant_key, detailJob} = API_CONFIG

describe('Detail Jobs', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${detailJob}`+ jobId.jobId)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Failed status 404', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${detailJob}`+'123456')
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('data not found')
  });
});
