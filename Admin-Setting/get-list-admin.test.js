const request = require('supertest');
const API_CONFIG = require('../app.js');

const { Base_Url, Admin_Token, User_Token } = API_CONFIG;


describe("Get ALL List User Admin - API", () => {
  it("Should successfully get list all admin by SuperAdmin", async () => {
    const getAll = await request(`${Base_Url}`)
    .get("user-hr/list/all")
    .set("Authorization",`Bearer ${Admin_Token}`)

    expect(getAll.status).toBe(200);
    expect(getAll.body.message).toEqual("success get user admin list");
  });

  it("Should successfully get list Active admin by SuperAdmin", async () => {
    const getActive = await request(`${Base_Url}`)
    .get("user-hr/list/active")
    .set("Authorization",`Bearer ${Admin_Token}`)
  
    expect(getActive.status).toBe(200);
    expect(getActive.body.message).toEqual("success get user admin list");
    getActive.body.data.forEach((data) => {
      expect(data.is_active).toBe(true);
    });
  });

  it("Should successfully get list Inactive admin by SuperAdmin", async () => {
    const getInactive = await request(`${Base_Url}`)
    .get("user-hr/list/inactive")
    .set("Authorization",`Bearer ${Admin_Token}`)
    
    expect(getInactive.status).toBe(200);
    expect(getInactive.body.message).toEqual("success get user admin list");
    getInactive.body.data.forEach((data) => {
    expect(data.is_active).toBe(false);
    });
  });

// GET LIST BY ADMIN or HR
  it("Should failed get list all admin by HR or Admin", async () => {
    const adminAll = await request(`${Base_Url}`)
    .get("user-hr/list/all")
    .set("Authorization",`Bearer ${Admin_Token}`)

    expect(adminAll.status).toBe(403);
    expect(adminAll.body.message).toEqual("Forbidden access");
  });
  
  it("Should failed get list Active admin by HR or Admin", async () => {
    const adminActive = await request(`${Base_Url}`)
    .get("user-hr/list/active")
    .set("Authorization",`Bearer ${Admin_Token}`)
  
    expect(adminActive.status).toBe(403);
    expect(adminActive.body.message).toEqual("Forbidden access");
  });

  it("Should failed get list Inactive admin by HR or Admin", async () => {
    const adminInactive = await request(`${Base_Url}`)
    .get("user-hr/list/inactive")
    .set("Authorization",`Bearer ${Admin_Token}`)
    
    expect(adminInactive.status).toBe(403);
    expect(adminInactive.body.message).toEqual("Forbidden access");
  });

// GET LIST BY USER
  it("Should failed get list all admin by User", async () => {
    const userAll = await request(`${Base_Url}`)
    .get("user-hr/list/all")
    .set("Authorization",`Bearer ${User_Token}`)

    expect(userAll.status).toBe(403);
    expect(userAll.body.message).toEqual("Forbidden access");
  });
  
  it("Should failed get list Active admin by User", async () => {
    const userActive = await request(`${Base_Url}`)
    .get("user-hr/list/active")
    .set("Authorization",`Bearer ${User_Token}`)
  
    expect(userActive.status).toBe(403);
    expect(userActive.body.message).toEqual("Forbidden access");
  });

  it("Should failed get list Inactive admin by User", async () => {
    const userInactive = await request(`${Base_Url}`)
    .get("user-hr/list/inactive")
    .set("Authorization",`Bearer ${User_Token}`)
    
    expect(userInactive.status).toBe(403);
    expect(userInactive.body.message).toEqual("Forbidden access");
  });

// GET LIST WITH NO AUTH
  it("Should failed get list with no Auth", async () => {
    const userInactive = await request(`${Base_Url}`)
    .get("user-hr/list/all")
    .set("Authorization",`Bearer`)
    
    expect(userInactive.status).toBe(401);
    expect(userInactive.body.message).toEqual("Authentication failure");
  });
});