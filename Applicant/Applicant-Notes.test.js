const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('Applicant Notes (Positif Case)', () => {
  it('should successfully get applicant notes', async () => {
    const response = await request(Base_Url)
      .put('applicant/notes/702f080b-1577-4b3a-907f-70cc9df25eec')
      .set('Authorization', `Bearer ${Admin_Token}`)
      .send({ notes: 'Edit1233' });

    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

describe('Applicant Notes (Negative Case)', () => {
it('must fail to edit applicant records', async () => {
  const response = await request(Base_Url)
    .put('applicant/notes/invalid-applicant-id')
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({ notes: 'Test123' });

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('get applicant by id failed');
  });
});