// author: stephen chiu
// date: feb 6, 2021
// about: main interface for message board

import React, { useState, useEffect } from 'react';
import Message from './comps/Message';

export default function App() {
  const [msgs, setMsgs] = useState([]);

  // fetch all messages
  function handleFetch() { 
    fetch('https://mb-back.herokuapp.com/get')
    .then(res => res.json())
    .then(obj => {
      const output = obj.rows.map(row => {
        let first = row.date.split('T');
        let second = first[1].split('.');
        return ({ ...row, d: first[0], t: second[0] })
      });
      setMsgs(output);
    });
  }

  // ugly work around to post then update state to trigger refresh...
  function handleSubmit() {
    document.getElementById('deleteform').submit();
    setTimeout(() => { handleFetch() }, 500); // refresh page after 0.5s   
    setTimeout(() => { handleFetch() }, 1000); // refresh page after 1s   
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // turns msg object into messages for display
  let messages = msgs.map((msg) => <Message key={msg.id} id={msg.id} name={msg.name} msg={msg.msg} d={msg.d} t={msg.t} />);
  messages = messages.sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));

  return (
    <div className="app">
      <div className="header">
        <p>welcome to message board</p>
      </div>
      {/* main message box */}
      <div className="messages">
        {messages}
      </div>
      
      <iframe title="hide" name="hide" className="hide" />
      <div className="footer">
        {/* add new message */}
        <div className="nowrap">
          <p>enter a new message: </p>
          <form method="post" action="https://mb-back.herokuapp.com/add" id='addform' target="hide" >
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="msg" placeholder="message" />
            <input type="submit" value="submit" onClick={e => { handleSubmit('addform') }} />
          </form>
        </div>
        {/* delete messsage */}
        <div className="nowrap">
          <p>delete a message: </p>
          <form method="post" action='https://mb-back.herokuapp.com/delete' id='deleteform' target='hide'>
            <input type="text" name="id" placeholder="id" />
            <input type="submit" value="submit" onClick={e => { handleSubmit('deleteform') }} />
          </form>
        </div>
      </div>
    </div>
  );
}
