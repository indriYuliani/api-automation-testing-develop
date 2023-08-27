const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, userId, invaliduserId, jobVacanciesId1, nonExistingJobVacanciesId } = API_CONFIG;


describe('Set PIC API', () => {

// [POST] Set PIC Job Vacancies
it('should successfully set PIC job vacancies', async () => {
    const response = await request (Base_Url)
    .post('job-vacancies/set-pic')
    .set('Authorization',`Bearer ${Admin_Token}`)
    .send({
        user_id: userId,
        job_vacancies_id: jobVacanciesId1,
      }); 

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("job vacancies pic has been set");
    console.log(response.body)
    console.log(response.body.message)
  });

// it('should return error for duplicate PIC', async () => {
//     const response = await request(Base_Url)
//     .post('job-vacancies/set-pic')
//     .set('Authorization', `Bearer ${Admin_Token}`)
//     .send({
//         user_id: userId,
//         job_vacancies_id: jobVacanciesId1,
//       });
  
//     expect(response.status).toBe(400);
//     expect(response.body.message).toEqual('PIC has been set for this job vacancies');
//     console.log(response.body)
//     console.log(response.body.message)
//   });
  
it('should return error for invalid user_id', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/set-pic')
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
        user_id: invaliduserId,
        job_vacancies_id: jobVacanciesId1,
      });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('set job vacancies pic failed');
    console.log(response.body)
    console.log(response.body.message)
  });
   
it('should return error cannot be empty if it doesnt fill in id', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/set-pic')
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
        user_id: userId,
        job_vacancies_id: nonExistingJobVacanciesId,
      });
  
    expect(response.status).toBe(422);
    expect(response.body.errors.job_vacancies_id).toEqual('cannot be blank');
    expect(response.body.message).toEqual('validation failed');
    console.log(response.body)
    console.log(response.body.message)
  }); 

});