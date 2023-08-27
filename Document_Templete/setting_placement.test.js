const request = require('supertest');
<<<<<<< HEAD
const API_CONFIG = require('../app');
const { Base_Url, Admin_Token } = API_CONFIG;
=======

// Change access token
const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTM5NTQ1MywiZXhwIjoxNjkxNDAyNjUzLCJqdGkiOiJlYTYyMGZkNS05ZGFhLTRkNDctOWY5Mi05ODM2YzI5ZjhmODciLCJ1aWQiOiJVQVQwMTMiLCJ1c2VyIjp7InByaXZ5SWQiOiJVQVQwMTMiLCJ1dWlkIjoiN2U2MDFkMDgtNzcyOS00ZjU0LTkyM2QtZmMyZDE1NzRiMmZiIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.j2WB2Wcaam0mVGp5AbIb2TQLm2KxdK0TRA7VpRYN51-7dnPSCVkn-9L_89WaS7-cAjgfUkvDSSz51zGkLEzjfcFd_pdKfn5Mve1WCRVAxCF1_HO_bZ2Qb54zBDEnQyc81xu1WRICTypOHJJt5_aoPEAL7udMVQw9g37wtV1gUV0eq_Wi8qDkMV-JUdDtSAESlJzFvPL6MMgEQ3Fm5nl1KFnfBZhT1cOG1QaEgklf_D7FaP6XDTamlovbzf1ZS7mZ5_Ue1J1J4dQFAOF16OIGDbIneMaceI3iuf4nxG4y4ZeanO5qXnuQ7x-XuGEZRYmzpF_NpepFSssV6IKrP_DluQ';

>>>>>>> 473dcc2b9ebb771b94e03f217646178f07c2d071

const data = {

	template_id: 'bee97f53-3c8d-47d9-9c36-193aafe14ff0',
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


	const data2 = {

		template_id: '',
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


		const data3 = {

			template_id: 'bee97f53-3c8d-47d9-9c36-193aafe14ff0',
			version_note: '',
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


			const data4 = {

				template_id: '03cd07c0-95b1-4a08-8417-b9bae40a3fa5',
				version_note: 'tambahan dob 1',
				placement: [
							  {
								"pos_x": '',
								"pos_y": '',
								"pages": '',
								"master_state_id": '',
								"height": '',
								"width":''
							  
							  },
							  {
								"pos_x": '',
								"pos_y": '',
								"pages": '',
								"master_state_id": '',
								"height": '',
								"width": ''
							  },
							  {
								"pos_x": '',
								"pos_y": '',
								"pages": '',
								"master_state_id": '',
								"height": '',
								"width": ''
							  } 
							]
				};

describe('Setting Placement', () => {
  it('should successfully get list templete', async () => {
    const response = await request(Base_Url)
      .post('template/setting-placement')
      .set('Authorization', `Bearer ${Admin_Token}`)
      //.field('template_id','03cd07c0-95b1-4a08-8417-b9bae40a3fa5')
      //.field('version_note','tambahan dob1')
      //.field(placement)
      .send(data)
      

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});


describe('Setting Placement', () => {
	it('Negative test template ID null get list templete', async () => {
	  const response = await request('https://app.aquarius.axeleration.id/api/')
		.post('template/setting-placement')
		.set('Authorization', `Bearer ${TOKEN}`)
		//.field('template_id','03cd07c0-95b1-4a08-8417-b9bae40a3fa5')
		//.field('version_note','tambahan dob1')
		//.field(placement)
		.send(data2)
		
  
	  console.log(response.body);
	  expect(response.status).toBe(404);
	  expect(response.body.message).toBe('template not found');
	});
  });


//   describe('Setting Placement', () => {
// 	it('Negative test Version ID null get list templete', async () => {
// 	  const response = await request('https://app.aquarius.axeleration.id/api/')
// 		.post('template/setting-placement')
// 		.set('Authorization', `Bearer ${TOKEN}`)
// 		//.field('template_id','03cd07c0-95b1-4a08-8417-b9bae40a3fa5')
// 		//.field('version_note','tambahan dob1')
// 		//.field(placement)
// 		.send(data3)
		
  
// 	  console.log(response.body);
// 	  expect(response.status).toEqual(401);
// 	  expect(response.body.message).toBe('Authentication failure');
// 	});
//   });

  describe('Setting Placement', () => {
	it('Negative test Body Request Null get list templete', async () => {
	  const response = await request('https://app.aquarius.axeleration.id/api/')
		.post('template/setting-placement')
		.set('Authorization', `Bearer ${TOKEN}`)
		//.field('template_id','03cd07c0-95b1-4a08-8417-b9bae40a3fa5')
		//.field('version_note','tambahan dob1')
		//.field(placement)
		.send(data4)
		
  
	  console.log(response.body);
	  expect(response.status).toBe(400);
	  expect(response.body.message).toBe('The request parameter invalid');
	});
  });

  describe('setting placement (Negative Case)', () => {
	it('should return 401 Unauthorized for invalid access token', async () => {
	  const INVALID_TOKEN = 'invalid_token_here';
  
	  const response = await request('https://app.aquarius.axeleration.id/api/')
	    .post('template/setting-placement')
		.set('Authorization', `Bearer ${INVALID_TOKEN}`);
  
	  console.log(response.body);
	  expect(response.status).toBe(401);
	  expect(response.body.message).toBe('Authentication failure');
	});
  });
  