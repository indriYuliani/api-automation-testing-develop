const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('Get List Applicant', () => {
  it('should successfully get applicant detail', async () => {
    const response = await request(Base_Url)
      .get('applicant/list')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data[0]).toHaveProperty('id', 'name','position','hiring_stage','status','updated_at');
    expect(response.body.message).toBe('success get applicants');
  });
});

describe('Get List Applicant - Invalid Param', () => {
  it('should successfully get applicant detail', async () => {
    const response = await request(Base_Url)
      .get('applicant/list?start_date=2022-10-10')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveProperty('end_date');
    expect(response.body.message).toBe('validation failed');
  });
});