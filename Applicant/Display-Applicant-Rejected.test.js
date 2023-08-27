const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('Get List Applicant - Rejected (Positif Case)', () => {
    it('should successfully get applicant list', async () => {
    const response = await request(Base_Url)
      .get('applicant/list?status=rejected')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Get List Applicant - Rejected (Negative Case', () => {
    it('should return 401 Unauthorized for invalid access token', async () => {
      const INVALID_TOKEN = 'invalid_token_here';
  
      const response = await request(Base_Url)
        .get('applicant/list?status=in_process')
        .set('Authorization', `Bearer ${INVALID_TOKEN}`);
  
      console.log(response.body);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Authentication failure');
    });
  });