// Imports
const fs = require("fs");

// Constants
const JSON_PATH = `${__dirname}/../../data/data-set.json`;

// Functions
function getUsers(req, res) {
  try {
    const buffer = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(buffer);
    const users = new Set(data.map(({ user_id }) => user_id));

    // Validation
    if (!users.size) {
      throw Error({ code: 404, message: "No Users Found" });
    }

    res.send([...users]);
  } catch ({ code, message }) {
    res.status(code || 500).send(message || "Something Went Wrong");
  }
}

module.exports = { getUsers };
