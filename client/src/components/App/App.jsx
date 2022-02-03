import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import usersApi from "../../api/userApi";
import EventsTimeline from "../EventsTimeline/EventsTimeline";
import "./App.css";

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
            <ListItem button key={`${id}_item`} onClick={() => setUserId(id)}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
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

  const refreshEvents = useCallback(async () => {
    const { data: events } = await usersApi.get(`/${userId}`);
    setUserEvents(events);
  }, [userId]);

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
          <List>{availableUsers}</List>
        </>
      )}
    </div>
  );
}

export default App;
