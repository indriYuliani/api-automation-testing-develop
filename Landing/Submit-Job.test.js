const request = require('supertest');
const API_CONFIG = require('../appLanding');
const jobId = require('../data/jobId.json');
const { submitId } = require('../data/submitId');
const {Base_Url, submit, merchant_key, User_Token} = API_CONFIG
describe('Submit Applicant', () => {
  it('Success status 200', async () => {
    const response = await request(`${Base_Url}`)
    .post(`${submit}`)
    .set('Authorization',`Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`)
    .field('job_vacancy_id',`${jobId.jobId}`)
    .attach('cv', './data/Doc-50-Page.pdf')
    .field('portfolio', 'www.notion.com/cahGanteng')
    .field('current_company','PT PP')
    .field('additional_information','')
    .field('github','')
    .field('linked_in','')
    .field('email','rian@mailinator.com')
    .field('phone','085226121221');

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    const data = response.body.data.id;
    console.log(data);

    await submitId(data)
  });
  it('Failed status 401', async () => {
    const response = await request(`${Base_Url}`)
    .post(`${submit}`)
    // .set('Authorization',`Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`)
    .field('job_vacancy_id',`${jobId.jobId}`)
    .attach('cv', './data/Doc-50-Page.pdf')
    .field('portfolio', 'www.notion.com/cahGanteng')
    .field('current_company','')
    .field('additional_information','')
    .field('github','')
    .field('linked_in','')
    .field('email','rian@mailinator.com')
    .field('phone','085151515151');

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Authentication failure');

  });
  it('Failed status 422', async () => {
    const response = await request(`${Base_Url}`)
    .post(`${submit}`)
    .set('Authorization',`Bearer ${User_Token}`)
    .set('Merchant-Key',`${merchant_key}`)
    .field('job_vacancy_id',`${jobId.jobId}`)
    .attach('cv', './data/Doc-50-Page.pdf')
    .field('portfolio', 'www.notion.com/cahGanteng')
    .field('current_company','')
    .field('additional_information','')
    .field('github','')
    .field('linked_in','')
    .field('email','')
    .field('phone','');

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.errors).toHaveProperty('current_company');
    expect(response.body.errors).toHaveProperty('email');
    expect(response.body.errors).toHaveProperty('phone');
  });
});