import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import Button from "@mui/material/Button";
import usersApi from "../../api/userApi";
import "./App.css";
import EventsTimeline from "../EventsTimeline/EventsTimeline";

function App() {
  const [availableUsers, setAvailableUsers] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

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

  useEffect(() => {
    const getUserEvents = async () => {
      const { data: events } = await usersApi.get(`/${userId}`);

      setUserEvents(events);
    };
    getUserEvents();
  }, [userId]);

  const resetUser = () => {
    setUserId(null);
    setUserEvents(null);
  };

  return (
    <div className="App">
      {userId && userEvents.length ? (
        <>
          <Button onClick={resetUser}>&lt; Back</Button>
          <EventsTimeline events={userEvents} />
        </>
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
