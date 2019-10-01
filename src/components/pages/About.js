import React from 'react'

export default function About() {
  return (
    <React.Fragment>
      <h1 style={{ paddingTop: '10px', position: 'relative', left: '10px' }}>About</h1>
      <div style={{ padding: '10px', position: 'relative', left: '10px' }}>
        <p>This project is a continuation of the React Crash Course of Transversy Media on Youtube. I added by myself some features.</p> 
        <br />
        <a href='https://www.youtube.com/watch?v=sBws8MSXN7A' target='_blank' rel='noopener noreferrer'>https://www.youtube.com/watch?v=sBws8MSXN7A</a> 
        <br />
        <br />
        <p>The React Crash Course includes: </p>
        <ul style={{ position: 'relative', padding: '10px', left: '10px' }}>
          <li>Working with props and use of Functions in React.</li>
          <li>CSS.</li>
          <li>Basic rendering of the React App (render, ComponentDidMount).</li>
          <li>Working with PropTypes.</li>
          <li>React Router.</li>
          <li>Getting data from an API and simulate interactions with Axios.</li>
        </ul>

        <p>I've added some features:</p>
        <ul style={{ position: 'relative', padding: '10px', left: '10px' }}>
          <li>Connect to Firebase.</li>
          <li>Load, add, delete and update todos.</li>
          <li>Ordering todos by Timestamp.</li>
          <li>Some Materials-UI.</li>
          <li>Creating 'Completed Todos' area.</li>
          <li>Some corrections of the CSS.</li>
          <li>Correct scroll bars and sizes.</li>
          <li>Correct wrapping on flexboxes.</li> 
        </ul>
      </div>
    </React.Fragment>
  )
}
