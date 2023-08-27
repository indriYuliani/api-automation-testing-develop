const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, userId, jobVacanciesId1, invalidVacanciesId } = API_CONFIG;


describe('Delete PIC API', () => {

// [POST] Delete PIC Job Vacancies
it('should successfully delete PIC job vacancies', async () => {
    const response = await request (Base_Url)
    .post('job-vacancies/remove-pic')
    .set('Authorization',`Bearer ${Admin_Token}`)
    .send({
        user_id: userId,
        job_vacancies_id: jobVacanciesId1,
      }); 

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("delete job pic success");
    console.log(response.body)
    console.log(response.body.message)
  });

it('should return error for invalid job_vacancies_id', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/remove-pic')
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
        user_id: userId,
        job_vacancies_id: invalidVacanciesId,
      });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('delete job pic failed');
    console.log(response.body)
    console.log(response.body.message)
  });
  
it('should return unauthorized without token', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/remove-pic')
    .send({
        user_id: userId,
        job_vacancies_id: jobVacanciesId1,
      });
  
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Authentication failure');
    console.log(response.body)
  });
  

});