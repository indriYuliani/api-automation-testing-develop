// const request = require('supertest');
// const API_CONFIG = require('../app');
// const { Base_Url, Admin_Token } = API_CONFIG;

// describe('Reject Applicant (Positif Case)', () => {
//     it('should successfully get applicant list', async () => {
//     const response = await request(Base_Url) 
//       .put('/applicant/status/reject/1a4adbe8-ae20-4703-80b9-4fcfa5f44938')
//       .set('Authorization', `Bearer ${Admin_Token}`)
//       .send();

//     console.log(response.body);
//     expect(response.status).toBe(200);
//   });
// });

// describe('Reject Applicant - Rejected (Negative Case', () => {
//     it('should return 401 Unauthorized for invalid access token', async () => {
//       const INVALID_TOKEN = 'invalid_token_here';
  
//       const response = await request(Base_Url)
//         .put('applicant/status/reject/b2150f75-ddda-4823-af6d-ee8ff3c8e6a9')
//         .set('Authorization', `Bearer ${INVALID_TOKEN}`);
  
//       console.log(response.body);
//       expect(response.status).toBe(401);
//       expect(response.body.message).toBe('Authentication failure');
//     });
//   });