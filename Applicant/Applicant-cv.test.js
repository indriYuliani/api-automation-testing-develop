const fs = require('fs');
const path = require('path');
const request = require('supertest');
const API_CONFIG = require('../app');

const tokenData = fs.readFileSync(path.join('./oauth/utils/tokens', 'generate_token.json'));
const { access_token } = JSON.parse(tokenData);
const { Base_Url } = API_CONFIG;

describe('Applicant Detail - Display CV', () => {
  it('should successfully get applicant detail', async () => {
    const response = await request(Base_Url)
      .get('applicant/cv/0b46db71-8da1-4212-83aa-495ad00d24c1')
      .set('Authorization', `Bearer ${access_token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
  });
});