const request = require('supertest');
const API_CONFIG = require('../appLanding');
const submit = require('../data/jobSubmitId.json')
const {Base_Url, merchant_key, User_Token, reject}= API_CONFIG

describe('Reject Offering', () => {
  it.skip('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${reject}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success reject applicant');
  });
  it('Failed status 400', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${reject}`+`12`)
    .set('Authorization', `Bearer ${User_Token}`)
    // .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('get applicant by id failed');
  });  
  it('Failed status 401', async () => {
    const response = await request(`${Base_Url}`) 
    .put(`${reject}`+`${submit.jobSubmitId}`)
    // .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Authentication failure');
  })
  it('Failed status 422', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${reject}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('failed to reject offering');
  });
  it('Failed status 404', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${reject}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
  it('Failed status 422', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${reject}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('failed to reject offering');
  });
});
