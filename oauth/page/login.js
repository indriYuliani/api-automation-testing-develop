require('dotenv').config();
const loginFlow = require("../utils/login.utils");
const { getAccessToken } = require("../utils/login.utils");

async function UAT013(){
  const token = await getAccessToken("UAT013", process.env.password, "./utils/tokens/generate_token.json")
  return token
}

module.exports = {UAT013};