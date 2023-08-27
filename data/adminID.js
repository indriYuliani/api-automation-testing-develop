const fs = require('fs/promises'); // menggunakan fs/promises untuk operasi berkas async
const path = require('path');

let adminId = '';

async function setAdminId(id) {
  adminId = id;
  await saveAdminIdToFile(adminId); // Menyimpan adminId ke file setiap kali diubah
}

async function getAdminId() {
  return adminId;
}

async function saveAdminIdToFile(id) {
  const filePath = path.join(__dirname, 'adminId.json'); // Ganti dengan path file yang sesuai
  const data = JSON.stringify({ adminId: id });
  await fs.writeFile(filePath, data);
}

module.exports = {
  setAdminId,
  getAdminId
};
