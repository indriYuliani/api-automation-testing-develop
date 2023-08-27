const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;

const param ={
    templateId:'9b61ed6d-4a54-4b96-bffc-17f6352717b1',
    templateVersionId:'18'
}
describe('Templete Detail', () => {
  it('should successfully templete detail', async () => {
    const response = await request(Base_Url)
      .get('template/setting-placement/detail/:templateId/:templateVersionId')
      .set('Authorization', `Bearer ${Admin_Token}`)
      .send(param);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});