const fs = require('fs/promises'); // menggunakan fs/promises untuk operasi berkas async
const path = require('path');

let jobId = '';

async function applicantId(id) {
  jobId = id;
  await saveAdminIdToFile(jobId); // Menyimpan adminId ke file setiap kali diubah
}

async function getJobId() {
  return jobId;
}

async function saveAdminIdToFile(id) {
  const filePath = path.join(__dirname, 'jobId.json'); // Ganti dengan path file yang sesuai
  const data = JSON.stringify({ jobId: id });
  await fs.writeFile(filePath, data);
}

module.exports = {
  applicantId,
  getJobId
};
