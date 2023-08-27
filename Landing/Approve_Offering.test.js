const request = require('supertest');
const API_CONFIG = require('../appLanding');
const submit = require('../data/jobSubmitId.json');
const {Base_Url, merchant_key, User_Token, approve}= API_CONFIG

describe('Approve Offering', () => {
  it.skip('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('failed to reject offering');
  });
  it('Failed status 422 invalid merchant-key', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    // .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('invalid parameter');
  });  
it('Failed status 401', async () => {
    const response = await request(`${Base_Url}`) 
    .put(`${approve}`+`${submit.jobSubmitId}`)
    // .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Authentication failure');
  })
  it('Failed status 400', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`+'7ba10810-43ca-4901-872a-e04df195e369')
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('error sent document to privy');
  });
  it('Failed status 404', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
  it('Failed status 422 invalid status', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('invalid applicant status');
  });
});
