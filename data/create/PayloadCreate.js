function generateRandomPrivyID() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let randomPrivyID = '';
  
    // Mengambil 3 karakter acak dari huruf (ABCDEFGHIJKLMNOPQRSTUVWXYZ)
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomPrivyID += letters[randomIndex];
    }
  
    // Mengambil 3 karakter acak dari angka (0123456789)
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      randomPrivyID += numbers[randomIndex];
    }
  
    return randomPrivyID.toUpperCase();
  };

function generateRandomUserName() {
    const names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
};

const CreateAdminPL = {
        "privy_id" : generateRandomPrivyID(),
        "name": generateRandomUserName(),
        "email" : "frtest3@yopmail.com",
        "role_id" : 2,
        "department_id": 1,
        "department_position_id": 1,
        "job_level_id": 1
};

const InvalidCreate = {
  "privy_id" : "",
  "name": "",
  "email" : "",
  "role_id" : 0,
  "department_id": 0,
  "department_position_id": 0,
  "job_level_id": 0
};

module.exports = {
    generateRandomPrivyID,
    generateRandomUserName,
    CreateAdminPL,
    InvalidCreate
};