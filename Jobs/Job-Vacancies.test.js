const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, tokennoAuth } = API_CONFIG;


describe('Job Vacancies API', () => {
    
// [GET] Job Vacancies    
it('should successfully get job vacancies', async () => {
    const response = await request (Base_Url)
    .get('job-vacancies?page=2')
    .set('Authorization',`Bearer ${Admin_Token}`);

    expect(response.status).toEqual(200); 
    expect(response.body.meta.page).toEqual("2");
    expect(response.body.message).toEqual("get data job vacancies success");
    console.log(response.body)
  });

it('should return unauthorized without valid token', async () => {
    const response = await request(Base_Url)
    .get('job-vacancies?title=Backend&page=1&per_page=1&status=active')
    .set('Authorization', `Bearer ${tokennoAuth}`);

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Authentication failure');
    console.log(response.body)
    console.log(response.body.message)
  });

});