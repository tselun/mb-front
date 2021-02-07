// author: stephen chiu
// date: feb 6, 2021
// about: component to add new message

import React from 'react';

export default function Delete() { 
    return (
        <div className="nowrap">
        <p>enter a new message: </p>
        <form method="post" action="https://mb-back.herokuapp.com/add" target="hide" >
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="msg" placeholder="message" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
}