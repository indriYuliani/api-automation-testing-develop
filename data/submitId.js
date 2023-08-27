const fs = require('fs/promises'); // menggunakan fs/promises untuk operasi berkas async
const path = require('path');

let submit = '';

async function submitId(id) {
  submit = id;
  await saveAdminIdToFile(submit); // Menyimpan adminId ke file setiap kali diubah
}

async function getJobId() {
  return jobId;
}

async function saveAdminIdToFile(id) {
  const filePath = path.join(__dirname, 'jobSubmitId.json'); // Ganti dengan path file yang sesuai
  const data = JSON.stringify({ jobSubmitId: id });
  await fs.writeFile(filePath, data);
}

module.exports = {
  submitId,
  getJobId
};
