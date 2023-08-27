function generateRandomUserName() {
    const names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
};

const updateAdminPL = {
    "name": "Update Admin " + generateRandomUserName(),
    "email": "frtest4@yopmail.com",
    "department_id": 1,
    "department_position_id": 1,
    "job_level_id": 2 
};

const invalidUpdate = {
    "name": "",
    "email": "",
    "department_id": 0,
    "department_position_id": 0,
    "job_level_id": 0 
}

module.exports = {
    generateRandomUserName,
    updateAdminPL,
    invalidUpdate
};