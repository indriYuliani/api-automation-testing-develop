const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;


describe('Create Jobs API', () => {

// [POST] Create Job Vacancies
it('should successfully create job vacancies', async () => {
  const response = await request(Base_Url)
    .post('job-vacancies/create')
    .set('Authorization', `Bearer ${Admin_Token}`)  
    .field(`title`, `Engineering Santozman`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `belah lautan`)
    .field(`requirements`, `belah gunung`)
    .field(`key_responsibility`, `belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)

    expect(response.status).toBe(201); 
    expect(response.body.message).toEqual("job vacancies has been saved");
    console.log(response.body)
  });

it('should job vacancies inactive with correct data', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/create')
    .set('Authorization', `Bearer ${Admin_Token}`)
    .field(`title`, `Engineering Santozman`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `belah lautan`)
    .field(`requirements`, `belah gunung`)
    .field(`key_responsibility`, `belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('job vacancies has been saved');
    expect(response.body.data.title).toEqual('Engineering Santozman');
    expect(response.body.data.status).toEqual('inactive');
    console.log(response)
    console.log(response.body.message)
  });

  it('should return an error if the id filled in is incorrect', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/create')
    .set('Authorization', `Bearer ${Admin_Token}`)  
    .field(`title`, `Engineering Santozman`)
    .field(`position_id`, 0)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `belah lautan`)
    .field(`requirements`, `belah gunung`)
    .field(`key_responsibility`, `belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(400); 
    expect(response.body.message).toEqual('save job vacancies failed');
      console.log(response)
  }); 

  it('should return an error if fill id other than integer', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/create')
    .set('Authorization', `Bearer ${Admin_Token}`)  
    .field(`title`, `Engineering Santozman`)
    .field(`position_id`, 1)
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, `null`)
    .field(`description`, `belah lautan`)
    .field(`requirements`, `belah gunung`)
    .field(`key_responsibility`, `belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(422); 
    expect(response.body.errors.office_id).toEqual('must be an integer number');
    expect(response.body.message).toEqual('validation error');
      console.log(response)
  }); 

  it('should return an error if the id fill in with empty', async () => {
    const response = await request(Base_Url)
    .post('job-vacancies/create')
    .set('Authorization', `Bearer ${Admin_Token}`)  
    .field(`title`, `Engineering Santozman`)
    // .field(`position_id`, )
    .field(`departmen_id`, 1)
    .field(`job_types_id`, 1)
    .field(`job_level_id`, 1)
    .field(`office_id`, 1)
    .field(`description`, `belah lautan`)
    .field(`requirements`, `belah gunung`)
    .field(`key_responsibility`, `belah bulan`)
    .field(`end_date`,`2023-08-03`)
    .field(`salary_range_up`,21000000)
    .field(`salary_range_down`,31000000)
    .field(`yoe`, `2`)
    // .attach(`cover_image`, ``)
  
    expect(response.status).toBe(422); 
    expect(response.body.errors.position_id).toEqual('cannot be blank');
    expect(response.body.message).toEqual('validation error');
      console.log(response)
  });   

});