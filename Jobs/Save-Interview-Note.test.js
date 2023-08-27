const request = require('supertest');
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token, applicantId, invalidapplicantId } = API_CONFIG;


describe('Save Interview Note API', () => {

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

});