const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, jobVacanciesId1, nonExistingJobVacanciesId } = API_CONFIG;


describe('Update Status API', () => {

// [PUT] Update Status Job (Active/Inactive)
it('should successfully update status Active', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update-status/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .send({
      "status" : "active"
    });

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("status job has been updated");
    console.log(response.body)
    console.log(response.body.message)
  });   

it('should successfully update status Inactive', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update-status/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .send({
      "status" : "inactive"
    });

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("status job has been updated");
    console.log(response.body)
    console.log(response.body.message)
  });   

  it('should return not found for non-existing status job', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update-status/${nonExistingJobVacanciesId}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .send({
      "status" : "inactive"
    });

    expect(response.status).toBe(404); 
    expect(response.body.message).toEqual("Tidak ditemukan");
    console.log(response.body)
    console.log(response.body.message)
  });  

  it('should return Unauthorized for missing or invalid token', async () => {
    const response = await request(Base_Url)
      .put(`job-vacancies/update-status/${jobVacanciesId1}`)
      .send({
        "status": "active"
      });
  
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Authentication failure");
    console.log(response.body);
  });
  
  it('should return validation failed for other than active and inactive', async () => {
    const response = await request(Base_Url)
      .put(`job-vacancies/update-status/${jobVacanciesId1}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
      .send({
        "status": "invalid_status"
      });
  
    expect(response.status).toBe(422);
    expect(response.body.errors.status).toEqual("must be a valid value");
    expect(response.body.message).toEqual("validation failed");
    console.log(response.body);
  });  

});