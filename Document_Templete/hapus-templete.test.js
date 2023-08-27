const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

describe('List Templete', () => {
  it('should successfully Hapus Templete', async () => {
    const response = await request(Base_Url)
      .delete('template/delete/:templateId/596b1025-b47e-4cd4-8119-47c2eb5c4da3')
      .set('Authorization', `Bearer ${Admin_Token}`);

    console.log(response.body);
    //expect(response.status).toBe(200);
    //expect(response.body).toHaveProperty('data');
  });
});