const puppeteer = require("puppeteer");
require('dotenv').config();
const fs = require("fs");
const supertest = require("supertest");
const cheerio = require("cheerio");

async function loginFlow(username, password) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(process.env.oauth_stg);
    await page.type('input[name="user[privyId]"]', username);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    await page.type('input[name="user[secret]"]', password);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    try {
      const authorizeButton = await page.waitForSelector(".btn.btn--authorize", {
        timeout: 3000,
      });
      await authorizeButton.click();
      await page.waitForTimeout(3000);
    } catch (error) {
    }
    const htmlContent = await page.content();
    const fileName = "./utils/code.html";
    fs.writeFileSync(fileName, htmlContent);
    await browser.close();
    const htmlCode = fs.readFileSync(fileName, "utf8");
    const $ = cheerio.load(htmlCode);
    const authorizationCode = $("#authorization_code").text();
    const res = await supertest(process.env.oauth_generate_stg)
          .post('')
          .set("Content-Type", "application/x-www-form-urlencoded")
          .field("grant_type", "authorization_code")
          .field("client_id", process.env.oauth_client_id)
          .field("client_secret", process.env.oauth_client_secret)
          .field("redirect_uri", process.env.redirect_uri)
          .field("code", authorizationCode);
        return res.body;
  } catch (err) {
    console.error("Error gan:", err);
  }
}

async function getUserProfile(accessToken) {
  try {
    const res = await supertest(process.env.user_profile)
      .get('')
      .set("Authorization", `Bearer ${accessToken}`);
    return res.status === 200;
  } catch (err) {
    console.error("Error getting user profile:", err);
    return false;
  }
}

async function checkAndExportAuthorizedToken(tokenFileName) {
  try {
    const jsonData = fs.readFileSync(tokenFileName, "utf8");
    const { access_token } = JSON.parse(jsonData);
    const isAuthorized = await getUserProfile(access_token);
    if (isAuthorized) {
      return access_token;
    } else {
      console.log("Access token is not authorized.");
      return null;
    }
  } catch (err) {
    console.error("Error checking and exporting authorized token:", err);
    return null;
  }
}

async function getAccessToken(username, password, tokenFileName) {
  const token = await checkAndExportAuthorizedToken(tokenFileName);
  if (token) {
    return token;
  } else {
    const res = await loginFlow(username, password);
    const accessToken = res.access_token;
    const jsonData = JSON.stringify({ access_token: accessToken });
    fs.writeFileSync(tokenFileName, jsonData);
    console.log("New access token obtained and saved.");
    return accessToken;
  }
}

module.exports = { getAccessToken };