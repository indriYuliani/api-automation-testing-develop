const request = require('supertest');
<<<<<<< HEAD
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;
=======

const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTM5NTQ1MywiZXhwIjoxNjkxNDAyNjUzLCJqdGkiOiJlYTYyMGZkNS05ZGFhLTRkNDctOWY5Mi05ODM2YzI5ZjhmODciLCJ1aWQiOiJVQVQwMTMiLCJ1c2VyIjp7InByaXZ5SWQiOiJVQVQwMTMiLCJ1dWlkIjoiN2U2MDFkMDgtNzcyOS00ZjU0LTkyM2QtZmMyZDE1NzRiMmZiIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.j2WB2Wcaam0mVGp5AbIb2TQLm2KxdK0TRA7VpRYN51-7dnPSCVkn-9L_89WaS7-cAjgfUkvDSSz51zGkLEzjfcFd_pdKfn5Mve1WCRVAxCF1_HO_bZ2Qb54zBDEnQyc81xu1WRICTypOHJJt5_aoPEAL7udMVQw9g37wtV1gUV0eq_Wi8qDkMV-JUdDtSAESlJzFvPL6MMgEQ3Fm5nl1KFnfBZhT1cOG1QaEgklf_D7FaP6XDTamlovbzf1ZS7mZ5_Ue1J1J4dQFAOF16OIGDbIneMaceI3iuf4nxG4y4ZeanO5qXnuQ7x-XuGEZRYmzpF_NpepFSssV6IKrP_DluQ';
>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071

describe('API Tests', () => {
  it('Should upload a document', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request(Base_Url)
      .post('template/upload')
<<<<<<< HEAD
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field('title', 'Ol63')
=======
      .set('Authorization', `Bearer ${TOKEN}`)
      .field('title', 'Ol141')
>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071
      .field('type', 'offering Letters')
      .attach('document', './Document_Templete/page.pdf'); 

    console.log(response.body);
    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('data');
  });
});

describe('API Tests', () => {
  it('Negative Test Case Title Null', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .post('template/upload')
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field('title', '')
      .field('type', 'offering Letters')
      .attach('document', './Document_Templete/page.pdf'); 

    console.log(response.body);
    expect(response.status).toBe(422); 
    expect(response.body.message).toBe('validation error');
  });
});


describe('API Tests', () => {
  it('Negative Test Case Type Null', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .post('template/upload')
<<<<<<< HEAD
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field('title', 'Ol88')
=======
      .set('Authorization', `Bearer ${TOKEN}`)
      .field('title', 'Ol134')
>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071
      .field('type', '')
      .attach('document', './Document_Templete/page.pdf'); 

    //console.log(response.body);
    expect(response.status).toBe(422); 
    expect(response.body.message).toBe('validation error');
  });
});


describe('API Tests', () => {
  it('Negative Test Case Document Null', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .post('template/upload')
<<<<<<< HEAD
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field('title', 'Ol64')
=======
      .set('Authorization', `Bearer ${TOKEN}`)
      .field('title', 'Ol133')
>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071
      .field('type', 'tes ya')
      .attach('document', ''); 

    console.log(response.body);
    expect(response.status).toBe(422); 
    expect(response.body.message).toBe('Unprocessable entity');
  });
});


describe('Templete Upload (Negative Case)', () => {
	it('should return 401 Unauthorized for invalid access token', async () => {
	  const INVALID_TOKEN = 'invalid_token_here';
  
	  const response = await request('https://app.aquarius.axeleration.id/api/')
	    .post('template/upload')
		.set('Authorization', `Bearer ${INVALID_TOKEN}`);
  
	  console.log(response.body);
	  expect(response.status).toBe(401);
	  expect(response.body.message).toBe('Authentication failure');
	});
  });

describe('API Tests', () => {
  it('Should upload a document selain pdf', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .post('template/upload')
<<<<<<< HEAD
      .set('Authorization', `Bearer ${Admin_Token}`)
      .field('title', 'Ol66')
=======
      .set('Authorization', `Bearer ${TOKEN}`)
      .field('title', 'Ol141')
>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071
      .field('type', 'offering Letters')
      .attach('document', './Document_Templete/mom.xlsx'); 

    console.log(response.body);
    expect(response.status).toBe(422); 
    expect(response.body.message).toBe('failed to upload document');
  });
});

// describe('API Tests', () => {
//   it('Negative document lebih 10MB ', async () => {
//    // const response = await request('https://ancient-emu-91.telebit.io/api/')
//     const response = await request('https://app.aquarius.axeleration.id/api/')
//       .post('template/upload')
//       .set('Authorization', `Bearer ${Admin_Token}`)
//       .field('title', 'OL91')
//       .field('type', 'Offering Letters')
//       .attach('document', './Document_Templete/15MB.pdf'); 

//     //console.log(response.body);
//     expect(response.status).toEqual(400); 
//     // expect(response.body.message).toEqual('error parsing request body as multipart/form-data');
//   });
//});

