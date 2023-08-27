const request = require('supertest');

// Change access token
const TOKEN = 'eyJhbGciOiJSUzUxMiIsImtpZCI6InM5Y0IwZkZXQTZKUVZ1c1dTOVhaR2tmYWxOQThBMUtUUlI5Qjg1dk1NV0UifQ.eyJpc3MiOiJQcml2eUlEIFByb3ZpZGVyIiwic3ViIjoiUHJpdnlJRCBQcm92aWRlciIsImlhdCI6MTY5MTMxODQ3NywiZXhwIjoxNjkxMzI1Njc3LCJqdGkiOiJjOWJhYWE5Zi04MWVjLTRjZWMtYTI1MC0wMzlhZmYwMGM1MzIiLCJ1aWQiOiJVQVQwMTMiLCJ1c2VyIjp7InByaXZ5SWQiOiJVQVQwMTMiLCJ1dWlkIjoiN2U2MDFkMDgtNzcyOS00ZjU0LTkyM2QtZmMyZDE1NzRiMmZiIn0sImNsYWltcyI6WyJ3cml0ZSIsInJlYWQiLCJwdWJsaWMiXX0.ZF0zDIO9Vji9CgO3HiHQY3cNpoCwJVHTasDTjiCKNzxpWXPKmkqF2V8OF28y3sV4p1UfliONFIQP8kdwUZMC3kY5vHYd-9U7G4MVpEa_srfN64saNKvXPFs-yElIFIaswrR1jO6U4ajU-ihuCbZVpKcfuo2FZbl94frT9-8uubZleywOq-Kb36IRjj6efW49GhqeOCKlaeHOO5L3ylxaPZktlmitThTJDVbCtwt3owHaXU5GSMDL2RW3UNRmGxn5OcQKgJ-R5RJky1vdOASGK2MSmRqJzLpByoXV-jjtsFGtL4_JI3hgI4KcTXknPM51Cv6Sf9_cOYPc8bpXRoXq6Q';

describe('Delete Templete', () => {
  it('should successfully delete templete', async () => {
    const response = await request('https://app.aquarius.axeleration.id/api/')
      .delete('template/delete/d55e0008-08c1-4e27-9315-66a0b40b864f')
      .set('Authorization', `Bearer ${TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('template has been deleted');
  });
});

describe('Delete (Negative Case)', () => {
  it('should return 401 Unauthorized for invalid access token', async () => {
    const INVALID_TOKEN = 'invalid_token_here';

    const response = await request('https://app.aquarius.axeleration.id/api/')
      .delete('template/delete/d55e0008-08c1-4e27-9315-66a0b40b864f')
      .set('Authorization', `Bearer ${INVALID_TOKEN}`);

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failure');
  });
});


describe('Delete Templete', () => {
    it('should successfully delete templete', async () => {
      const response = await request('https://app.aquarius.axeleration.id/api/')
        .delete('template/delete/00')
        .set('Authorization', `Bearer ${TOKEN}`);
  
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('template has been deleted');
    });
  });

