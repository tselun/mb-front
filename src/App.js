// author: stephen chiu
// date: feb 6, 2021
// about: main interface for message board

import React, { useState, useEffect } from 'react';
import Message from './comps/Message';
import Add from './comps/Add';
import Delete from './comps/Delete';

export default function App() {
  const [msgs, setMsgs] = useState([]);

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

  useEffect(() => {
    handleFetch();
    // const interval = setInterval( ()=>{handleFetch()}, 1000)   
    // return()=>clearInterval(interval)
  }, []);

  let messages = msgs.map((msg) => <Message key={msg.id} id={msg.id} name={msg.name} msg={msg.msg} d={msg.d} t={msg.t} />);
  messages = messages.sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));

  return (
    <div className="app">
      <div className="header">
        <p>welcome to message board</p>
      </div>
      <div className="messages">
        {messages}
      </div>
      
      <iframe name="hide" className="hide"></iframe>
      <div className="footer">
        <Add /> <Delete />
      </div>

    </div>
  );
}
