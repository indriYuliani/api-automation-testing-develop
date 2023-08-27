const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, jobVacanciesId1, jobVacanciesId2, nonExistingJobVacanciesId } = API_CONFIG;


describe('Job Detail API', () => {

// [GET] Job Vacancies Detail
it('should successfully get job vacancies detail', async () => {
    const response = await request (Base_Url)
    .get(`job-vacancies/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${Admin_Token}`);

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("get data job detail success");
    console.log(response.body)
    console.log(response.body.message)
  });
  
it('should return not found for non-existing job vacancies detail', async () => {
    const response = await request(Base_Url)
    .get(`job-vacancies/${nonExistingJobVacanciesId}`)
    .set('Authorization', `Bearer ${Admin_Token}`);
  
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Tidak ditemukan');
    console.log(response.body)
  });
  
it('should return job vacancies details with data inactive', async () => {
    const response = await request(Base_Url)
    .get(`job-vacancies/${jobVacanciesId1}`)
    .set('Authorization', `Bearer ${Admin_Token}`);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('get data job detail success');
  
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toEqual(jobVacanciesId1);
    expect(response.body.data.title).toEqual('Product Manager');
    expect(response.body.data.status).toEqual('inactive');
    console.log(response.body)
    console.log(response.body.message)
  });

  it('should return job vacancies details with data active', async () => {
    const response = await request(Base_Url)
    .get(`job-vacancies/${jobVacanciesId2}`)
    .set('Authorization', `Bearer ${Admin_Token}`);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('get data job detail success');
  
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toEqual(jobVacanciesId2);
    expect(response.body.data.title).toEqual('Engineering Manager');
    expect(response.body.data.status).toEqual('active');
    console.log(response.body)
    console.log(response.body.message)
  });


});