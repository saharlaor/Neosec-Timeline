import React, { Fragment, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import usersApi from "../../api/userApi";
import "./UserList.css";

function UserList({ handleClick }) {
  const [availableUsers, setAvailableUsers] = useState(null);

  useEffect(() => {
    const generateUserList = async () => {
      const { data: users } = await usersApi.get("/");
      setAvailableUsers(
        users.map((id) => (
          <Fragment key={id}>
            <Divider />
            <ListItem button onClick={() => handleClick(id)}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
          </Fragment>
        ))
      );
    };
    generateUserList();
  }, [handleClick]);

  return (
    <div className="UserList">
      <List>{availableUsers}</List>
    </div>
  );
}

export default UserList;
