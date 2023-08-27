const request = require('supertest');
const API_CONFIG = require('./appLanding');
const { applicantId } = require('./data/applicantId');
const { submitId } = require('./data/submitId');
const jobId = require('./data/jobId.json')
const submit = require('./data/jobSubmitId.json')

const { Base_Url, User_Token, merchant_key, list_job, list_submit, preview, approve, reject} = API_CONFIG

describe('List Jobs', () => {
it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get(`${list_job}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    const data = response.body.data[0].id;
    console.log(data);

    await applicantId(data)
  });
});

describe('Detail Jobs', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .get('detail-jobs/'+ jobId.jobId)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

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
});

describe('Approve Offering', () => {
  it('Status 400', async () => {
    const response = await request(`${Base_Url}`)
    .put(`${approve}`+`${submit.jobSubmitId}`)
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Merchant-Key', `${merchant_key}`)

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual('invalid applicant status');
  });
});

describe('Reject Offering', () => {
    it('Status 422', async () => {
      const response = await request(`${Base_Url}`)
      .put(`${reject}`+`${submit.jobSubmitId}`)
      .set('Authorization', `Bearer ${User_Token}`)
      .set('Merchant-Key', `${merchant_key}`)
  
      console.log(response.body);
      expect(response.status).toBe(422);
      expect(response.body.message).toEqual('failed to reject offering');
    });
});

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
});


