const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, userId, invaliduserId, jobVacanciesId1, nonExistingJobVacanciesId, invalidVacanciesId,
  jobVacanciesId2, jobVacanciesId3, tokennoAuth, applicantId, invalidapplicantId } = API_CONFIG;


describe('Job Vacancies API', () => {

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

// [PUT] Save Interview Note
it('should successfully update note applicant', async () => {
    const response = await request(Base_Url)
      .put(`applicant/notes/${applicantId}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
      .send({
        notes: "testing belah gunung" // optional
      });
  
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("success update notes applicant");
    console.log(response.body);
    console.log(response.body.message);
  });
  
  it('should return error failed if fill in id is empty', async () => {
    const response = await request(Base_Url)
      .put(`applicant/notes/${invalidapplicantId}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
      .send({
        notes: "testing belah gunung" // optional
      });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("get applicant by id failed");
    console.log(response.body);
    console.log(response.body.message);
  });
  
  it('should successfully update note applicant', async () => {
    const response = await request(Base_Url)
      .put(`applicant/notes/${applicantId}`)
      .set('Authorization', `Bearer ${Admin_Token}`)
  
  
    expect(response.status).toBe(422);
    expect(response.body.message).toEqual("validate param failed");
    console.log(response.body);
    console.log(response.body.message);
  });   

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