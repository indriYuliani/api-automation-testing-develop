const {UAT013} = require('../page/login');
const supertest = require("supertest");
require('dotenv').config();

describe('Login Users', () => {
    it.only('Login UAT013', async () => {
      const access_token = await UAT013();
      console.log(access_token);
      const res = await supertest(process.env.user_profile)
      .get('')
      .set("Authorization", 'Bearer '+access_token)
      console.log(res.body)
    });
});  
