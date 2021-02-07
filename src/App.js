import React, { useState, useEffect } from 'react';
import Message from './comps/Messages';

function App() {
  const [msgs, setMsgs] = useState([]);
  const [id, setID] = useState('');

  useEffect(() => {
    fetch('https://mb-back.herokuapp.com/get')
      .then(res => res.json())
      .then(obj => {

        const output = obj.rows.map(row => {
          let first = row.date.split('T');
          let second = first[1].split('.');
          return ({ ...row, d:first[0], t:second[0] })
        });
        setMsgs(output);
      });
  }, []);
  
  return (
    <div className="app">
      <div className="header">
        <p>welcome to message board</p>
      </div>
      <div className="messages">
        {msgs.map((msg) => <Message key={msg.id} id={msg.id} name={msg.name} msg={msg.msg} d={msg.d} t={msg.t} /> )}
      </div>
      
      <iframe name="hide" className="hide"></iframe>
      <div className="footer">
        <p>enter a new message: </p>
        <form method="post" action="https://mb-back.herokuapp.com/add"  >
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="msg" placeholder="message" />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div className="footer">
        <p>delete a message: </p>
        <form method="post" action="https://mb-back.herokuapp.com/delete"  >
          <input type="text" name="id" placeholder="id"/>
          <input type="submit" value="submit"  />
        </form>
      </div>
      <button onSubmit={ window.location.reload()}>refresh</button>
    </div>
  );
}

export default App;
