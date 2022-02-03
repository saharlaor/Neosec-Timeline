import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import usersApi from "../../api/userApi";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [availableUsers, setAvailableUsers] = useState(null);

  useEffect(() => {
    const generateUserList = async () => {
      const { data: users } = await usersApi.get("/");
      setAvailableUsers(
        users.map((id) => (
          <>
            <Divider key={`${id}_divider`} />
            <li
              key={`${id}_item`}
              onClick={() => setUserId(id)}
              className="user-ids__entry">
              {id}
            </li>
          </>
        ))
      );
    };
    generateUserList();
  }, []);

  return (
    <div className="App">
      {userId ? (
        <></>
      ) : (
        <>
          <h2>User IDs - Pick One</h2>
          <ul className="user-ids">{availableUsers}</ul>
        </>
      )}
    </div>
  );
}

export default App;
