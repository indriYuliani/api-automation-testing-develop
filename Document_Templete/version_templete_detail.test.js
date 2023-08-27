const request = require('supertest');

const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTMxNjQ1NiwiZXhwIjoxNjkxMzIzNjU2LCJqdGkiOiJhYzdjZDBiNy04ZDZiLTQzZTUtYTY0MS05YjNiOWMwNmI3MGEiLCJ1aWQiOiJVQVQwMTMiLCJ1c2VyIjp7InByaXZ5SWQiOiJVQVQwMTMiLCJ1dWlkIjoiN2U2MDFkMDgtNzcyOS00ZjU0LTkyM2QtZmMyZDE1NzRiMmZiIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.B6zcmG1phQ3-4dD3oLeyjVgWC42ynV011pJkvpLpPIbjZMB1FPQa3jDSXFIi5lmgzh_6Rd5AEA0JbLRWc8W62OV49MTAcfA0JcA48U804XZsjzer6CHYaz-ipdr1KjHnQclxA32k7iQQw61cuka6gNH6Drlpd3eLqOEcofUcWvrtdSuzo-SorPvwxJYQnzced92C8ITfkQX7DeaUEGKTTl_zEySj9oYrYU-dDDkuwOGSO4aGfTxR__47gspYweeBvV_o8YPNzu8TzQEyDNb5YpsyJOPwIJJ2inR5M2fUEecBHB3iokpTRrhrqTMa7VwcLjkntHjKOZb0mLxSBK2qCQ';

describe('Version template detail ', () => {
  it('get version detail ', async () => {
   // const response = await request('https://ancient-emu-91.telebit.io/api/')
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .get('/template/setting-placement/detail/9b61ed6d-4a54-4b96-bffc-17f6352717b1/18')
      .set('Authorization', `Bearer ${TOKEN}`)
      // .field('templateId', '9b61ed6d-4a54-4b96-bffc-17f6352717b1')
      // .field('templateVersionId', '18')
     

    console.log(response.body);
    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('data');
  });
});

describe('List templete (Negative Case)', () => {
  it('should return 401 Unauthorized for invalid access token', async () => {
    const INVALID_TOKEN = 'invalid_token_here';

    const response = await request('https://app.aquarius.axeleration.id/api/')
    .get('/template/setting-placement/detail/9b61ed6d-4a54-4b96-bffc-17f6352717b1/18')
      .set('Authorization', `Bearer ${INVALID_TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failure');
  });
});

describe('List Templete negatif case', () => {
  it('should failed id get list templete', async () => {
    const response = await request('https://app.aquarius.axeleration.id/api/')
    .get('/template/setting-placement/detail/9b61ed6d-4a54-4b96-bffc-17f6352717b1/40')
    .set('Authorization', `Bearer ${TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('template version not use this template');
  });
}); 


describe('List Templete negatif case', () => {
  it('should failed id get list templete', async () => {
    const response = await request('https://app.aquarius.axeleration.id/api/')
    .get('/template/setting-placement/detail/00/18')
    .set('Authorization', `Bearer ${TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('template not found');
  });
});