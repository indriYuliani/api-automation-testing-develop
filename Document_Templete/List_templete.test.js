const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('List Templete', () => {
  it('should successfully get list templete', async () => {
    const response = await request(Base_Url)
      .get('template?templateId=6f0fdba8-2629-4f70-9ca6-8f9ff0fe9f54')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Applicant Detail (Negative Case)', () => {
  it('should return 401 Unauthorized for invalid access token', async () => {
    const INVALID_TOKEN = 'invalid_token_here';

    const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('template?templateId=6f0fdba8-2629-4f70-9ca6-8f9ff0fe9f54')
      .set('Authorization', `Bearer ${INVALID_TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failure');
  });
});


