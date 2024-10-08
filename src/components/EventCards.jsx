import React, { useEffect, useState } from "react";

// Helper function to filter upcoming events
const filterUpcomingEvents = (events, key, currentDate) => {
  return events.filter((event) => new Date(event[key]) >= currentDate)
               .sort((a, b) => new Date(a[key]) - new Date(b[key]));
};

const EventCards = ({ allEvents }) => {
  const [upcomingLectures, setUpcomingLectures] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    
    // Filter upcoming lectures, assignments, and exams
    setUpcomingLectures(filterUpcomingEvents(allEvents.lectures, 'date', currentDate));
    setUpcomingAssignments(filterUpcomingEvents(allEvents.assignments, 'due', currentDate));
    setUpcomingExams(filterUpcomingEvents(allEvents.exams, 'date', currentDate));
  }, [allEvents]);

  return (
    <div className="card-grid">
      {/* Lecture Card */}
      <div className="card">
        <h3>Upcoming Lecture</h3>
        {upcomingLectures.length > 0 ? (
          <div>
            <p>The next lecture will cover: {upcomingLectures[0].title}</p>
            <p>Date: {new Date(upcomingLectures[0].date).toLocaleDateString()}</p>
            <div>
              <strong>Readings:</strong>
              <ul>
                {upcomingLectures[0].readings.map((reading, index) => (
                  <li key={index}>
                    <a href={reading.link} target="_blank" rel="noopener noreferrer">
                      {reading.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>There are no upcoming lectures.</p>
        )}
      </div>

      {/* Assignment Card */}
      <div className="card">
        <h3>Upcoming Assignment</h3>
        {upcomingAssignments.length > 0 ? (
          <div>
            <p>Title: {upcomingAssignments[0].title}</p>
            <p>Description: {upcomingAssignments[0].description}</p>
            <p>Due Date: {new Date(upcomingAssignments[0].due).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No assignments are due soon.</p>
        )}
      </div>

      {/* Exam Card */}
      <div className="card">
        <h3>Upcoming Exam</h3>
        {upcomingExams.length > 0 ? (
          <p>The next exam is on: {new Date(upcomingExams[0].date).toLocaleDateString()}</p>
        ) : (
          <p>No upcoming exams scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default EventCards;
