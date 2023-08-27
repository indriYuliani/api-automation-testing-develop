const request = require('supertest');
const API_CONFIG = require('../app.js');

const { Base_Url, Admin_Token, User_Token } = API_CONFIG;
const { generateRandomPrivyID, generateRandomUserName, CreateAdminPL, InvalidCreate } = require('../data/create/PayloadCreate.js');
const { setAdminId } = require('../data/adminID.js');

describe("Add User Admin", () => {
  it("Should successfully add admin with valid data", async () => {
    const addAdmin = await request(`${Base_Url }`)
      .post("user-hr/create")
      .set("Authorization",`Bearer ${Admin_Token}`)
      .send({...CreateAdminPL})

    expect(addAdmin.status).toBe(201);
    expect(addAdmin.body.message).toEqual("user has been saved");
    expect(addAdmin.body.data.is_active).toBe(true);
    const adminId = addAdmin.body.data.id;
    console.log(adminId);

    await setAdminId(adminId);
  });

  it("Should failed add admin with invalid data", async () => {
    const invalidAdmin = await request(`${Base_Url }`)
    .post("user-hr/create")
    .set("Authorization",`Bearer ${Admin_Token}`)
    .send({...InvalidCreate})
  
    expect(invalidAdmin.status).toBe(422);
    expect(invalidAdmin.body.message).toEqual("validation failed");
  });
  
  it("Should failed add admin with no Auth", async () => {
      const noAuth = await request(`${Base_Url }`)
      .post("user-hr/create")
      .set("Authorization",`Bearer`)
      .send({...CreateAdminPL})
  
      expect(noAuth.status).toBe(401);
      expect(noAuth.body.message).toEqual("Authentication failure");
  });

  it("Should failed add admin with Admin or HR", async () => {
    const AdminAuth = await request(`${Base_Url }`)
    .post("user-hr/create")
    .set("Authorization",`Bearer ${Admin_Token}`)
    .send({...CreateAdminPL})

    expect(AdminAuth.status).toBe(403);
    expect(AdminAuth.body.message).toEqual("Forbidden access");
  });

  it("Should failed add admin with User or Candidate", async () => {
    const UserAuth = await request(`${Base_Url }`)
    .post("user-hr/create")
    .set("Authorization",`Bearer ${User_Token}`)
    .send({...CreateAdminPL})

    expect(UserAuth.status).toBe(403);
    expect(UserAuth.body.message).toEqual("Forbidden access");
  });
});
