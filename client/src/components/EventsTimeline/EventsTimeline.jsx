import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import "./EventsTimeline.css";

function EventsTimeline({ events }) {
  console.log("events", events);

  const eventEls = events.map(({ timestamp, method, uri }) => (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        {timestamp}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {method} - {uri}
      </TimelineContent>
    </TimelineItem>
  ));

  return (
    <div className="EventsTimeline">
      <Timeline>{eventEls}</Timeline>
    </div>
  );
}

export default EventsTimeline;
