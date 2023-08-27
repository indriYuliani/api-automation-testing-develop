const request = require('supertest');

// Change access token
const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTMxMzMwOCwiZXhwIjoxNjkxMzIwNTA4LCJqdGkiOiJkZjFhMTMyNC02MTQxLTRlM2EtYjIxZS05OTM3NmYzNWI2NzEiLCJ1aWQiOiJVQVQwMTMiLCJ1c2VyIjp7InByaXZ5SWQiOiJVQVQwMTMiLCJ1dWlkIjoiN2U2MDFkMDgtNzcyOS00ZjU0LTkyM2QtZmMyZDE1NzRiMmZiIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.ot80Xw5mkHmuavSmOJZQVfiI-QfSRj2PMFiUSp6bHnkBzIifYpzWGjInkOp2oC5caYN-YISKSGriUOxo5vq-25n9zwR4chy0NxVIH9aOVJthtZgeD8C0tuvaFawqO3qnaxVebKvErTCR-JxalypzUTQne2Q6qTt7HKitEDxuccUh-nZur_vYmWVUbngmeJryTQAzz_IF-e3m5IWKyVR5pQYwKE21qnHKmx65DPbMLqYh_PeJK1K6hH_fAKl3gWXxiF2Y1zIEr3S1i7SCs0E9K5c8PLjOOtGrfBQDRQcVbiolz1r666lNI31CKEzoBHWOU4HTiIZc1dgs7zsxnZ6ENA';

describe('List Templete', () => {
  it('should successfully get list templete', async () => {
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('template/stream/53c3dd92-5e17-4fb2-83b3-c9a67be3c7ef')
      .set('Authorization', `Bearer ${TOKEN}`);

    console.log(response.body);
    //expect(response.status).toBe(200);
    //expect(response.body).toHaveProperty('data');
  });
});

describe('List Templete (Negative Case)', () => {
  it('should return 401 Unauthorized for invalid access token', async () => {
    const INVALID_TOKEN = 'invalid_token_here';

    const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('template/stream/53c3dd92-5e17-4fb2-83b3-c9a67be3c7ef')
      .set('Authorization', `Bearer ${INVALID_TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failure');
  });
});


describe('List Templete', () => {
    it('Negative Test Template ID Null', async () => {
      const response = await request('https://app.aquarius.axeleration.id/api/')
        .get('template/stream/00')
        .set('Authorization', `Bearer ${TOKEN}`);
  
      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('data template not found');
    });
  });


