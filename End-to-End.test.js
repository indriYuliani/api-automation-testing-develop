const fs = require('fs');
const path = require('path');
const request = require('supertest');
const API_CONFIG = require('./app');

const tokenData = fs.readFileSync(path.join('./oauth/utils/tokens', 'generate_token.json'));
const { access_token } = JSON.parse(tokenData);
const { Base_Url, Base_Web_Url, userId, jobVacanciesId1 } = API_CONFIG;
const { CreateAdminPL } = require('./data/create/PayloadCreate.js');
const { updateAdminPL } = require('./data/update/PayloadUpdate.js');
const { setAdminId } = require('./data/adminID.js');
const AdminID = require('./data/adminId.json');

// Landing Page

describe('Landing', () => {
  it('should successfully get a list of jobs', async () => {
    const response = await request(Base_Web_Url)
      .get('list-jobs?page=1&per_page=50')

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should successfully get detail jobs', async () => {
    const response = await request(Base_Web_Url)
      .get('detail-jobs/a9938c63-c8a2-40a4-ae57-ed0f565be6e5')

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Jobs', () => {
  it('should successfully create job vacancies', async () => {
    const response = await request(Base_Url)
      .post('job-vacancies/create')
      .set('Authorization', `Bearer ${access_token}`)  
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
      .field(`yoe`, `1`)
  
      expect(response.status).toBe(201); 
      expect(response.body.message).toEqual("job vacancies has been saved");
      console.log(response.body)
  });

  it('should successfully get job vacancies', async () => {
    const response = await request (Base_Url)
    .get('job-vacancies?page=2')
    .set('Authorization',`Bearer ${access_token}`);

    expect(response.status).toEqual(200); 
    expect(response.body.meta.page).toEqual("2");
    expect(response.body.message).toEqual("get data job vacancies success");
    console.log(response.body)
  });

  it('should successfully get job vacancies detail', async () => {
    const response = await request (Base_Url)
    .get(`job-vacancies/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${access_token}`);

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("get data job detail success");
    console.log(response.body)
    console.log(response.body.message)
  });

  it('should successfully set PIC job vacancies', async () => {
    const response = await request (Base_Url)
    .post('job-vacancies/set-pic')
    .set('Authorization',`Bearer ${access_token}`)
    .send({
        user_id: userId,
        job_vacancies_id: jobVacanciesId1,
      }); 

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("job vacancies pic has been set");
    console.log(response.body)
    console.log(response.body.message)
  });

  it('should successfully update Job', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${access_token}`)
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
  
    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("job vacancies has been updated");
    console.log(response.body)
    console.log(response.body.message)
  });

  it('should successfully update status Active', async () => {
    const response = await request (Base_Url)
    .put(`job-vacancies/update-status/${jobVacanciesId1}`)
    .set('Authorization',`Bearer ${access_token}`)
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
    .set('Authorization',`Bearer ${access_token}`)
    .send({
      "status" : "inactive"
    });

    expect(response.status).toBe(200); 
    expect(response.body.message).toEqual("status job has been updated");
    console.log(response.body)
    console.log(response.body.message)
  });  
});

// Applicant List

  describe('Applicant List', () => {
    it('should successfully get applicant list - In process', async () => {
      const response = await request(Base_Url)
        .get('applicant/list?status=in_process')
        .set('Authorization', `Bearer ${access_token}`);
  
      console.log(response.body);
      expect(response.status).toBe(200);
    });

    it('should successfully get applicant list - All', async () => {
      const response = await request(Base_Url)
        .get('applicant/list')
        .set('Authorization', `Bearer ${access_token}`);
  
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data[0]).toHaveProperty('id', 'name','position','hiring_stage','status','updated_at');
    });

  it('should successfully get applicant list - Reject', async () => {
    const response = await request(Base_Url)
      .get('applicant/list?status=rejected')
      .set('Authorization', `Bearer ${access_token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should successfully get applicant Job list', async () => {
    const response = await request(Base_Url)
      .get('applicant/list/job/1a4adbe8-ae20-4703-80b9-4fcfa5f44938')
      .set('Authorization', `Bearer ${access_token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

// Applicant Detail

  describe('Applicant Detail', () => {
    it('should successfully get applicant detail', async () => {
      const response = await request(Base_Url)
        .get('applicant/detail/877239c0-2876-11ee-be56-0242ac120002')
        .set('Authorization', `Bearer ${access_token}`);
  
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });

    it('should successfully get applicant CV', async () => {
      const response = await request(Base_Url)
        .get('applicant/cv/0b46db71-8da1-4212-83aa-495ad00d24c1')
        .set('Authorization', `Bearer ${access_token}`);
    
      console.log(response.body);
      expect(response.status).toBe(200);
    });

  it('should successfully put applicant notes', async () => {
    const response = await request(Base_Url)
      .put('applicant/notes/702f080b-1577-4b3a-907f-70cc9df25eec')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ notes: 'Edit1233' });

    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should successfully get applicant document', async () => {
  const response = await request(Base_Url)
    .get('applicant/document/702f080b-1577-4b3a-907f-70cc9df25eec')
    .set('Authorization', `Bearer ${access_token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success get applicant document');
  });
});

// Document Template

describe('Document Template', () => {
  it('Should upload a document', async () => {
    const randomTitle = generateRandomString(6);
    const response = await request(Base_Url)
    .post('template/upload')
    .set('Authorization', `Bearer ${access_token}`)
    .field('title', randomTitle)
    .field('type', 'offering Letters')
    .attach('document', './Document_Templete/page.pdf'); 

   console.log(response.body);
   expect(response.status).toBe(201); 
   expect(response.body).toHaveProperty('data');
});

  it('should successfully get list templete', async () => {
    const response = await request(Base_Url)
      .get('template?templateId=6f0fdba8-2629-4f70-9ca6-8f9ff0fe9f54')
      .set('Authorization', `Bearer ${access_token}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  const data = {

    template_id: '03cd07c0-95b1-4a08-8417-b9bae40a3fa5',
    version_note: 'tambahan dob 1',
    placement: [
            {
            "pos_x": 589.4112548828124,
            "pos_y": 909.4687499999998,
            "pages": 1,
            "master_state_id": 2,
            "height": 36,
            "width":120
            
            },
            {
            "pos_x": 293.30883789062494,
            "pos_y": 873.8096923828123,
            "pages": 1,
            "master_state_id": 3,
            "height": 36,
            "width": 120
            },
            {
            "pos_x": 105.71874999999997,
            "pos_y": 909.1484374999998,
            "pages": 1,
            "master_state_id": 5,
            "height": 36,
            "width": 120
            } 
          ]
  };

    it('should successfully templete detail', async () => {
      const response = await request(Base_Url)
        .get('template/detail/53c3dd92-5e17-4fb2-83b3-c9a67be3c7ef')
        .set('Authorization', `Bearer ${access_token}`);
  
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });

    it('Post Setting Placement', async () => {
      const response = await request(Base_Url)
        .post('template/setting-placement')
        .set('Authorization', `Bearer ${access_token}`)
        .send(data)
        
      console.log(response.body);
   });

   it('Get Version Detail', async () => {
     const response = await request('https://app.aquarius.axeleration.id/api/')
       .get('/template/setting-placement/detail/9b61ed6d-4a54-4b96-bffc-17f6352717b1/18')
       .set('Authorization', `Bearer ${access_token}`)      
 
     console.log(response.body);
     expect(response.status).toBe(200); 
     expect(response.body).toHaveProperty('data');
   });
}); 

// // // Admin Settings

describe("Admin Setting", () => {
  it("Should successfully get list all admin by SuperAdmin", async () => {
    const getAll = await request(`${Base_Url}`)
    .get("user-hr/list/all")
    .set("Authorization",`Bearer ${access_token}`)

    expect(getAll.status).toBe(200);
    expect(getAll.body.message).toEqual("success get user admin list");
  });

  it("Should successfully get list Active admin by SuperAdmin", async () => {
    const getActive = await request(`${Base_Url}`)
    .get("user-hr/list/active")
    .set("Authorization",`Bearer ${access_token}`)
  
    expect(getActive.status).toBe(200);
    expect(getActive.body.message).toEqual("success get user admin list");
    getActive.body.data.forEach((data) => {
      expect(data.is_active).toBe(true);
    });
  });

  it("Should successfully get list Inactive admin by SuperAdmin", async () => {
    const getInactive = await request(`${Base_Url}`)
    .get("user-hr/list/inactive")
    .set("Authorization",`Bearer ${access_token}`)
    
    expect(getInactive.status).toBe(200);
    expect(getInactive.body.message).toEqual("success get user admin list");
    getInactive.body.data.forEach((data) => {
    expect(data.is_active).toBe(false);
    });
  });

  it("Should successfully add admin with valid data", async () => {
    const addAdmin = await request(`${Base_Url}`)
      .post("user-hr/create")
      .set("Authorization",`Bearer ${access_token}`)
      .send({...CreateAdminPL})

    expect(addAdmin.status).toBe(201);
    expect(addAdmin.body.message).toEqual("user has been saved");
    expect(addAdmin.body.data.is_active).toBe(true);
    const adminId = addAdmin.body.data.id;
    console.log(adminId);

    await setAdminId(adminId);
  });

  it("Should successfully Update admin with valid data", async () => {
    const updateAdmin = await request(`${Base_Url}`)
      .put("user-hr/update/" + AdminID.adminId)
      .set("Authorization", `Bearer ${access_token}`)
      .send({ ...updateAdminPL });

    expect(updateAdmin.status).toBe(200);
    expect(updateAdmin.body.message).toEqual("user admin has been updated");
  });
});

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}