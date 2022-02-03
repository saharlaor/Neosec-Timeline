// Imports
const fs = require("fs");

// Constants
const JSON_PATH = `${__dirname}/../../data/data-set.json`;

// Functions
function getUsers() {
  try {
    const buffer = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(buffer);
    const users = new Set(data.map(({ user_id }) => user_id));

    return users;
  } catch (err) {
    throw Error({ code: 500, message: "Something Went Wrong" });
  }
}

function getUser() {
  try {
    const buffer = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(buffer);
    return data;
  } catch (err) {
    throw Error({ code: 500, message: "Something Went Wrong" });
  }
}

function deleteEvent(id) {
  const buffer = fs.readFileSync(JSON_PATH);
  const data = JSON.parse(buffer);
  const events = data.filter((item) => item.id !== id);
  fs.writeFileSync(JSON_PATH, JSON.stringify(events));
}

module.exports = {
  getDataUsers: getUsers,
  getDataUser: getUser,
  deleteDataEvent: deleteEvent,
};
