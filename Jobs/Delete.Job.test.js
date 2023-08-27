const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, jobVacanciesId3 } = API_CONFIG;


describe('Delete Jobs API', () => {

// [POST] Delete Job Vacancies

it('should successfully delete Job', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update/${jobVacanciesId3}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .field(`title`, `Product Manager`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `Bisa Manage Dinosaurus`)
    .field(`requirements`, `bisa belah lautan`)
    .field(`key_responsibility`, `bisa belah bulan`)
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

  it('should return error for invalid job_vacancies_id', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update/${jobVacanciesId3}`)
    .set('Authorization',`Bearer ${Admin_Token}`)
    .field(`title`, `Product Manager`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `Bisa Manage Dinosaurus`)
    .field(`requirements`, `bisa belah lautan`)
    .field(`key_responsibility`, `bisa belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, ``)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(400);
    // expect(response.body.message).toEqual("delete job vacancies failed"); 
    expect(response.body.message).toEqual("update job vacancies failed");
    console.log(response.body)
    console.log(response.body.message)
  });  

});