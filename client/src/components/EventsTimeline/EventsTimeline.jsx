import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import "./EventsTimeline.css";
import { useState } from "react";

const METHOD_COLOR = {
  GET: "blue",
  POST: "green",
  PUT: "orange",
  AUTH: "purple",
  DELETE: "red",
};

function EventsTimeline({ events }) {
  const [chosenEvent, setChosenEvent] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState();
  const [displayMargin, setDisplayMargin] = useState(3);

  useEffect(() => {
    const relevantEvents = events.slice(
      Math.max(0, chosenEvent - displayMargin),
      Math.min(chosenEvent + displayMargin + 1, events.length)
    );
    const eventEls = relevantEvents.map(
      ({ id, timestamp, method, uri }, index) => (
        <TimelineItem key={id} onClick={() => handleEventClick(index)}>
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
        </TimelineItem>
      )
    );
    setDisplayedEvents(eventEls);
  }, [chosenEvent, displayMargin, events]);

  const handleEventClick = (index) => {
    let newIndex;
    if (chosenEvent < 7) {
      newIndex = Math.max(0, chosenEvent - 3) + index;
    } else if (chosenEvent > events.length - 6) {
      newIndex = chosenEvent + index - 3;
    } else {
      newIndex = chosenEvent + index;
    }
    setChosenEvent(newIndex);
  };

  const handleUpClick = () => {
    setChosenEvent((prev) => Math.max(0, prev - 1));
  };

  const handleDownClick = () => {
    setChosenEvent((prev) => Math.min(prev + 1, events.length));
  };

  return (
    <div className="EventsTimeline">
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
