const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, jobVacanciesId1 } = API_CONFIG;


describe('Update Jobs API', () => {

// [POST] Update Job
it('should successfully update Job', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .field(`title`, `Product Manager`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `belah gunung 1`)
    .field(`requirements`, `belah gunung 2`)
    .field(`key_responsibility`, `belah gunung 3`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("job vacancies has been updated");
    console.log(response.body)
    console.log(response.body.message)
  });

  it('should return Unprocessable Entity for invalid data', async () => {
    const response = await request(Base_Url)
      .put(`job-vacancies/update/${jobVacanciesId1}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field(`title`, ``)
      .field(`position_id`, 1)
      .field(`departmen_id`, 1)
      .field(`job_types_id`, 1)
      .field(`job_level_id`, 1)
      .field(`office_id`, 1)
      .field(`description`, `belah gunung 1`)
      .field(`requirements`, `belah gunung 2`)
      .field(`key_responsibility`, `belah gunung 3`)
      .field(`end_date`,`2023-08-03`)
      .field(`salary_range_up`,21000000)
      .field(`salary_range_down`,31000000)
      .field(`yoe`, `2`)
      // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(422);
    expect(response.body.errors.title).toEqual('cannot be blank');
    expect(response.body.message).toEqual('validation error');
    console.log(response.body);
  });
  
  it('should return Not Found for invalid job ID', async () => {
    const response = await request(Base_Url)
      .put(`job-vacancies/update/${jobVacanciesId1}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field(`title`, `Product Manager`)
      .field(`position_id`, 98)
      .field(`departmen_id`, 1)
      .field(`job_types_id`, 1)
      .field(`job_level_id`, 1)
      .field(`office_id`, 1)
      .field(`description`, `belah gunung 1`)
      .field(`requirements`, `belah gunung 2`)
      .field(`key_responsibility`, `belah gunung 3`)
      .field(`end_date`,`2023-08-03`)
      .field(`salary_range_up`,21000000)
      .field(`salary_range_down`,31000000)
      .field(`yoe`, `2`)
      // .attach(`cover_image`, ``)
    
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('update job vacancies failed');
    console.log(response.body);
  });
  

//   it('should return 400 Bad Request for end date in the past', async () => {
//     const pastDate = new Date('2024-07-10').toISOString(); // Set a date in the past
  
//     const response = await request(Base_Url)
//       .put(`job-vacancies/update/${jobVacanciesId1}`)
//       .set('Authorization', `Bearer ${Admin_Token}`)
//       .field(`title`, `Product Manager`)
//       .field(`position_id`, 1)
//       .field(`departmen_id`, 1)
//       .field(`job_types_id`, 1)
//       .field(`job_level_id`, 1)
//       .field(`office_id`, 1)
//       .field(`description`, `belah gunung 1`)
//       .field(`requirements`, `belah gunung 2`)
//       .field(`key_responsibility`, `belah gunung 3`)
//       .field(`end_date`, pastDate)
//       .field(`salary_range_up`,21000000)
//       .field(`salary_range_down`,31000000)
//       .field(`yoe`, `2`)
//       // .attach(`cover_image`, ``)
  
//     expect(response.status).toBe(400);
//     expect(response.body.message).toEqual('End date cannot be in the past');
//     console.log(response.body);
//   });
  

});