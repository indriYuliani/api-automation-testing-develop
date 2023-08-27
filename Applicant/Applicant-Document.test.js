const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('Get List Applicant - in Process (Positif Case)', () => {
    it('should successfully get applicant list', async () => {
    const response = await request(Base_Url)
      .get('applicant/document/702f080b-1577-4b3a-907f-70cc9df25eec')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success get applicant document');
  });
});

describe('Get List Applicant - in Process (Negative Case)', () => {
    it('should return 401 Unauthorized for invalid access token', async () => {
      const INVALID_TOKEN = 'invalid_token_here';
  
      const response = await request(Base_Url)
        .get('applicant/document/702f080b-1577-4b3a-907f-70cc9df25eec')
        .set('Authorization', `Bearer ${INVALID_TOKEN}`);
  
      console.log(response.body);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Authentication failure');
    });
  });