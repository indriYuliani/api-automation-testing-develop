const request = require('supertest');
const base_url='https://app.aquarius.axeleration.id/api/'
// const API_CONFIG = require('../app');
const API_CONFIG = {
  Base_Url: 'https://app.aquarius.axeleration.id/api/',
  Admin_Token:'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTMyOTE1MSwiZXhwIjoxNjkxMzM2MzUxLCJqdGkiOiI2N2JkMDgxYy05NmZlLTRjMTQtOGU2Yi1iY2ZhZGQ4NWE2NmIiLCJ1aWQiOiJURTQ0NTUiLCJ1c2VyIjp7InByaXZ5SWQiOiJURTQ0NTUiLCJ1dWlkIjoiZjI0N2NkYmEtNGEyOC00OGYwLWFkZmQtYWIwODZmY2JmYjhkIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.KVRtwMtERRNV3wSXsZMVyr-IMzz3KhFMfUAiu7TFFWlU39vwXDDimGYgXzco512Bp8wxHgavxchmguoADs6VXfz-ZDRXpZB_udxc2tAZiib1nJNgmYMSwFR6qeFArIwUcridYyqH1oga2QA7ef9-k7vQQED9A-C4MQENoVZnBFLa9WQciOchclcYvfcWldKHl3-w0onRHnv-9IETJbB9lC_YoKO_MhnxYHOdJpcHZ6ilLwbMcgasFC4UB9Y_ES2-rlZvYhXtWC8uBWemyY0AQiyOHntkg4DZxZKGcTcmsT5FD0y1_GzBV_p2d-WvFLuILMvdvhuLrWn7km63j9BmmA',
  User_Token:'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTMyNTczMywiZXhwIjoxNjkxMzMyOTMzLCJqdGkiOiI1Y2YwZGFjOS03NWRmLTQ4ZmEtYTMxMC04NDRlNGVkN2I5MDYiLCJ1aWQiOiJERVZBRDQwOTYiLCJ1c2VyIjp7InByaXZ5SWQiOiJERVZBRDQwOTYiLCJ1dWlkIjoiNDRjYWVkNTEtZTU5Yi00NjEzLWFjNGItZWY3YmY4MWEzMWU5In0sImNsYWltcyI6WyJwdWJsaWMiLCJyZWFkIl19.igd1VgNtbZQ3qhuuJ1gWGZdJMOpnCRQqOIH2hMKFGWy7TEJ9wvc8wEc1rhutl-LDVADC9mjgoJ5b61atgyUajtTF0IhmsIQPnBK3P0mE_iQ0evX5c6Lnzbh4Kq6TEo3Z_nF4bWZsQWq5s0Hgihv7A8MQy24aGkNS4KfS8R1RQ30PbeoMh2gujB0xTVP9QRibmfIMApLANqNEvBKHHf0VF4deanPdvzCr_M8mrKrhpa0xPCEhGl1CuoooxYwW5j_wF9sHHKHrfLZd_3gzBJi2BoVD_jJP7on0Hc7GYPpKWBJ5XnFLYjIcg_kuIo7nS8vnB0hWGZZSKnpgmWMj9bH0ZA',
  Base_Url_Web:'https://api.aquarius.axeleration.id/web/api/v1/',
  MKey:'6qvva5bpwwqaqinzarn7'
};
const path = require("path");

const { Base_Url, Admin_Token,User_Token,Base_Url_Web,MKey } = API_CONFIG;
const FILE = path.resolve(__dirname, "../data/pdf/A4 LANDSCAPE.pdf");
let candidate_id=''



// const { BASE_URL_1, BASE_URL_2, ENDPOINT_1, ENDPOINT_2, ENDPOINT_3, TOKEN } = API_CONFIG;

// Change access token
const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTEyMDM5MSwiZXhwIjoxNjkxMTI3NTkxLCJqdGkiOiI0NDJkZTBjZi0yOWI4LTRkNGItYWFkMS04MmFmZjlhYThmZWMiLCJ1aWQiOiJURTQ0NTUiLCJ1c2VyIjp7InByaXZ5SWQiOiJURTQ0NTUiLCJ1dWlkIjoiZjI0N2NkYmEtNGEyOC00OGYwLWFkZmQtYWIwODZmY2JmYjhkIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.yJzFk8f4rttoxpDGw0t-gm2V-qQLNdQyaVQ9gG4t6nv8ZMHDHyduYEUSS2ElctpsUO6VWH-AKdRnMTJFK9zTav7XdtEwFTat7gM9oxdep7_q3HjshvIOFRszK5nAO7fRBSGi-xhnSDj_E5VstxhpHgnhXPy1bSrESQjlPSHCIQyiKPLJ2SV_yk3Wr1v8KdZsWYMT2RuFaCa11Zjz3WL4VVdkImL_cLBPazGpYAgCJVVtcHmaQ5SLds_HvFLuT0RHWn7CoAk0VwWFfZi5MvS-_9dsZDahG2kOx5L7pPQn_cB2W4iUff1ltNyvo9W05lvgS_5Tu8K58LXhuDOjpk-4GA';

// describe('Get List Applicant', () => {
//   it('should successfully get applicant detail', async () => {
//     const response = await request(Base_Url)
//       .get('applicant/list')
//       .set('Authorization', `Bearer ${Admin_Token}`);

//     console.log(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data[0]).toHaveProperty('id', 'name','position','hiring_stage','status','updated_at');
//     expect(response.body.message).toBe('success get applicants');
//   });
// });

// describe('Get List Applicant - Invalid Param', () => {
//   it('should successfully get applicant detail', async () => {
//     const response = await request(Base_Url)
//       .get('applicant/list?start_date=2022-10-10')
//       .set('Authorization', `Bearer ${Admin_Token}`);

//     console.log(response.body);
//     expect(response.status).toBe(422);
//     expect(response.body).toHaveProperty('errors');
//     expect(response.body.errors).toHaveProperty('end_date');
//     expect(response.body.message).toBe('validation failed');
//   });
// });

describe('Set Submit Applicant', () => {
  it('should successfully submit applicant', async () => {
    const formData = {
      job_vacancy_id: '3dc0a8b0-19dc-4c03-9094-86cdc19a8916',
      cv: FILE,
      portofolio: 'www.portofolio.com',
      current_company:'tokped, shopee, privy, pertamina',
      additional_information:'gg gimank',
      github:'www.github.com/wynnflower',
      linked_in:'www.linkedin.com',
      email:'sirenvoice48@gmail.com',
      phone:'081393135616'
    };
  const response = await request(Base_Url_Web)
    .post('submit-applicant')
    .set('Authorization', `Bearer ${User_Token}`)
    .set('Content-Type','multipart/form-data; boundary=<calculated when request is sent>')
    .set('Merchant-Key', MKey)
    .field('job_vacancy_id', formData.job_vacancy_id)
    .attach('cv', formData.cv)
    .field('portofolio', formData.portofolio)
    .field('current_company', formData.current_company)
    .field('additional_information', formData.additional_information)
    .field('github', formData.github)
    .field('linked_in', formData.linked_in)
    .field('email', formData.email)
    .field('phone', formData.phone)

    console.log(FILE)
    console.log(response.body);
    console.log(response.body.data.candidate_id);
    candidate_id=response.body.data.id
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('data submit has been saved and uploaded');
  })
})

describe('Set CV Screening to HR Interview', () => {
  it('should successfully change status to HR Interview', async () => {
  const response = await request(Base_Url)
    .put('applicant/stage/update/'+candidate_id)
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
      "hiring_stage":"hr_interview",
      "status":"in_process",
      "data":{
          "date":"2023-08-31",
          "meeting_link":"www.test.com",
          "guest":["02a0e01c-08c8-4241-b9e1-4cd016562869"]
          }
      })

  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('success update stage applicant to hr interview');
})
})

describe('Set HR Interview to Skill Test', () => {
  it('should successfully change status to Skill Test', async () => {
  const response = await request(Base_Url)
    .put('applicant/stage/update/'+candidate_id)
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
      "hiring_stage":"skill_test", //mandatory, value must be "skill_test"
      "status": "in_process", //mandatory, value must be "in_process"
      "data": {
          "deadline": "2023-08-05T17:00:00.000Z", //mandatory
          "test_skill_id":1, //mandatory
          "guest":["dc671408-37da-4119-b14a-b01adfcbdd8c"] //mandatory
      }
  })

  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('success update stage applicant to skill test');
})
})

describe('Set Skill Test to User Interview', () => {
  it('should successfully change status to User Interview', async () => {
  const response = await request(Base_Url)
    .put('applicant/stage/update/'+candidate_id)
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
      "hiring_stage":"user_interview",
    "status":"in_process",
    "data":{
      "date":"2023-08-23T17:00:00.000Z",
      "meeting_link":"http://www.google.com",
      "guest":["5e5896c5-3199-40b1-936f-5a11aa7cb060"]
    }
  })

  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('success update stage applicant to user interview');
})
})
describe('Set User Interview to Ready to Hire - Need Action', () => {
  it('should successfully change status to Ready to Hire - Need Action', async () => {
  const response = await request(Base_Url)
    .put('applicant/stage/update/'+candidate_id)
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
      "hiring_stage":"ready_to_hire",
      "status":"need_action"
  })

  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('success update stage applicant to ready to hire');
})
})
describe('Set User Interview to Ready to Hire Need Action - Waiting', () => {
  it('should successfully change status to Ready to Hire - Waiting', async () => {
  const response = await request(Base_Url)
    .put('applicant/stage/update/'+candidate_id)
    .set('Authorization', `Bearer ${Admin_Token}`)
    .send({
      "hiring_stage":"ready_to_hire",
      "status":"need_action"
  })

  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('success update stage applicant to ready to hire');
})
})