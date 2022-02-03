import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteIcon from "@mui/icons-material/Delete";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import eventApi from "../../api/eventApi";
import "./EventsTimeline.css";

const METHOD_COLOR = {
  GET: "blue",
  POST: "green",
  PUT: "orange",
  AUTH: "purple",
  DELETE: "red",
};

function EventsTimeline({ events, handleRefresh }) {
  const [chosenEvent, setChosenEvent] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState();
  const [displayMargin, setDisplayMargin] = useState(3);

  useEffect(() => {
    const relevantEvents = events.slice(
      Math.max(0, chosenEvent - displayMargin),
      Math.min(chosenEvent + displayMargin + 1, events.length)
    );

    const handleEventClick = (index) => {
      let newIndex;
      if (chosenEvent < 7) {
        newIndex = Math.max(0, chosenEvent - displayMargin) + index;
      } else if (chosenEvent > events.length - displayMargin * 2) {
        newIndex = chosenEvent + index - displayMargin;
      } else {
        newIndex = chosenEvent + index;
      }
      setChosenEvent(newIndex);
    };

    const handleEventDelete = async (id) => {
      try {
        await eventApi.delete(`/${id}`);
        await handleRefresh();
      } catch (err) {
        console.log(err);
      }
    };

    const eventEls = relevantEvents.map(
      ({ id, timestamp, method, uri }, index) => {
        return (
          <TimelineItem
            className={
              index === Math.min(chosenEvent, displayMargin) && "active-event"
            }
            key={id}
            onClick={() => handleEventClick(index)}>
            <TimelineOppositeContent color="text.secondary">
              {timestamp}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <span
                style={{
                  color: METHOD_COLOR[method] || "yellow",
                  borderColor: METHOD_COLOR[method] || "yellow",
                }}
                className="method">
                {method}
              </span>{" "}
              - {uri}
            </TimelineContent>
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => handleEventDelete(id)}
            />
          </TimelineItem>
        );
      }
    );
    setDisplayedEvents(eventEls);
  }, [chosenEvent, displayMargin, events, handleRefresh]);

  const handleMarginChange = (e) => {
    setDisplayMargin(e.target.value);
  };

  const handleUpClick = () => {
    setChosenEvent((prev) => Math.max(0, prev - 1));
  };

  const handleDownClick = () => {
    setChosenEvent((prev) => Math.min(prev + 1, events.length));
  };

  return (
    <div className="EventsTimeline">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={displayMargin}
          onChange={handleMarginChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
      <Button color="primary" variant="contained" onClick={handleUpClick}>
        <ArrowDropUpIcon />
      </Button>
      <Timeline>{displayedEvents}</Timeline>
      <Button color="primary" variant="contained" onClick={handleDownClick}>
        <ArrowDropDownIcon />
      </Button>
    </div>
  );
}

export default EventsTimeline;
