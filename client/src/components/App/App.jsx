import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import usersApi from "../../api/userApi";
import EventsTimeline from "../EventsTimeline/EventsTimeline";
import UserList from "../UserList/UserList";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

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

  const refreshEvents = useCallback(async () => {
    const { data: events } = await usersApi.get(`/${userId}`);
    setUserEvents(events);
  }, [userId]);

  const userClick = useCallback((id) => {
    setUserId(id);
  }, []);

  return (
    <div className="App">
      {userId && userEvents.length ? (
        <>
          <Button onClick={resetUser}>&lt; Back</Button>
          <EventsTimeline events={userEvents} handleRefresh={refreshEvents} />
        </>
      ) : (
        <>
          <h2>User IDs - Pick One</h2>
          <UserList handleClick={userClick} />
        </>
      )}
    </div>
  );
}

export default App;
