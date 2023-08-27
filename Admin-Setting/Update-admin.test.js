const request = require('supertest');
const API_CONFIG = require('../app.js');

const { Base_Url, Admin_Token, User_Token } = API_CONFIG;
const { generateRandomUserName, updateAdminPL, invalidUpdate } = require('../data/update/PayloadUpdate.js');
const AdminID = require('../data/adminId.json');

describe("Update User Admin Data", () => {
  it("Should successfully Update admin with valid data", async () => {
    const updateAdmin = await request(`${Base_Url}`)
      .put("user-hr/update/" + AdminID.adminId)
      .set("Authorization", `Bearer ${Admin_Token}`)
      .send({ ...updateAdminPL});

    expect(updateAdmin.status).toBe(200);
    expect(updateAdmin.body.message).toEqual("user admin has been updated");
  });

  it("Should failed Update Admin with invalid data", async () => {
    const invUpdate = await request(`${Base_Url}`)
    .put("user-hr/update/" + AdminID.adminId)
    .set("Authorization",`Bearer ${Admin_Token}`)
    .send({...invalidUpdate})

    expect(invUpdate.status).toBe(422);
    expect(invUpdate.body.message).toEqual("validation failed");
  });

  it("Should failed Update Admin with no Auth", async () => {
    const noAuthUpdate = await request(`${Base_Url}`)
    .put("user-hr/update/" + AdminID.adminId)
    .set("Authorization",`Bearer`)
    .send({...updateAdminPL})

    expect(noAuthUpdate.status).toBe(401);
    expect(noAuthUpdate.body.message).toEqual("Authentication failure");
  });

  it("Should failed Update Admin with Admin Token", async () => {
    const AdminAuth = await request(`${Base_Url}`)
    .put("user-hr/update/" + AdminID.adminId)
    .set("Authorization",`Bearer ${Admin_Token}`)
    .send({...updateAdminPL})

    expect(AdminAuth.status).toBe(403);
    expect(AdminAuth.body.message).toEqual("Forbidden access");
  });

  it("Should failed Update Admin with User Token", async () => {
    const UserAuth = await request(`${Base_Url}`)
    .put("user-hr/update/" + AdminID.adminId)
    .set("Authorization",`Bearer ${User_Token}`)
    .send({...updateAdminPL})

    expect(UserAuth.status).toBe(403);
    expect(UserAuth.body.message).toEqual("Forbidden access");
  });
  
//UPDATE STATUS to INACTIVE
  it("Should successfully Update admin to Inactive", async () => {
    const updateInactive = await request(`${Base_Url}`)
    .put("user-hr/deactivate/" + AdminID.adminId)
    .set("Authorization", `Bearer ${Admin_Token}`)
  
    expect(updateInactive.status).toBe(200);
    expect(updateInactive.body.message).toEqual("user admin has been deactivated");
    console.log(updateInactive);
  });

//UPDATE STATUS to ACTIVE
  it("Should successfully Update admin to Active", async () => {
    const updateActive = await request(`${Base_Url}`)
    .put("user-hr/activate/" + AdminID.adminId)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(updateActive.status).toBe(200);
    expect(updateActive.body.message).toEqual("user admin has been activated");
  });
});
