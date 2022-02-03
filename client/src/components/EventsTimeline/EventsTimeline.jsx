import React, { useEffect } from "react";
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
    console.log("eventEls", eventEls);
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
    console.log("chosenEvent", newIndex);
    setChosenEvent(newIndex);
  };

  return (
    <div className="EventsTimeline">
      <Timeline>{displayedEvents}</Timeline>
    </div>
  );
}

export default EventsTimeline;
