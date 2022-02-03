// Imports
const {
  getDataUsers,
  getDataUser,
  deleteDataEvent,
} = require("../services/services");

// Functions
function getUsers(req, res) {
  try {
    const users = getDataUsers();

    // Validation
    if (!users.size) {
      throw Error({ code: 404, message: "No Users Found" });
    }

    res.send([...users]);
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
}

function getUser(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      throw Error({ code: 400, message: `Invalid Empty ID` });
    }

    const data = getDataUser();
    const events = data.filter(({ user_id }) => user_id === id);
    if (!events) {
      throw Error({ code: 404, message: `User ${id} Not Found` });
    }
    const eventsData = events.map(
      ({ id, timestamp, method, call_path: uri }) => {
        return { id, timestamp, method, uri };
      }
    );

    res.send(eventsData);
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
}

function deleteEvent(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      throw Error({ code: 404, message: `Event Not Found` });
    }

    deleteDataEvent(id);
    res.send("Success");
  } catch ({ code, message }) {
    res.status(code || 500).send(message || "Something Went Wrong");
  }
}

module.exports = { getUsers, getUser, deleteEvent };
