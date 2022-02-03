import React, { useEffect, useState } from "react";
import usersApi from "../../api/userApi";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(null);

  useEffect(() => {
    const generateUserList = async () => {
      const { data: users } = await usersApi.get("/");
      console.log("users", users);
      setAvailableUsers(
        users.map((id) => (
          <li
            key={id}
            onClick={() => setUserId(id)}
            className="user-ids__entry">
            {id}
          </li>
        ))
      );
    };
    generateUserList();
  }, []);

  return userId ? (
    <div className="App"></div>
  ) : (
    <ul className="user-ids">{availableUsers}</ul>
  );
}

export default App;
