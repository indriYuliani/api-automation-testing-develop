const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('Templete Detail', () => {
  it('should successfully templete detail', async () => {
    const response = await request(Base_Url)
      .get('template/detail/53c3dd92-5e17-4fb2-83b3-c9a67be3c7ef')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});


describe('List Templete (Negative Case)', () => {
  it('should return 401 Unauthorized for invalid access token', async () => {
    const INVALID_TOKEN = 'invalid_token_here';

    const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('template/detail/53c3dd92-5e17-4fb2-83b3-c9a67be3c7ef')
      .set('Authorization', `Bearer ${INVALID_TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failure');
  });
});


describe('List Templete', () => {
    it('Negative Test Template ID Null', async () => {
      const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('template/detail/00')
      .set('Authorization', `Bearer ${Admin_Token}`);
  
      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('template not found');
    });
  });