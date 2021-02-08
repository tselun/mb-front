// author: stephen chiu
// date: feb 6, 2021
// about: component to delete message

import React, { useState } from 'react';

export default function Delete() { 

    function handleSubmit(e){ 
        e.preventDefault();
        fetch('https://mb-back.herokuapp.com/delete', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: {
            "id": msg.id;
          }
        })
    
      }
    return (
        <div className="nowrap">
            <p>delete a message: </p>
            <form method="post" action="https://mb-back.herokuapp.com/delete" target="hide" >
                <input type="text" name="id" placeholder="id"/>
                <input type="submit" value="submit" />
            </form>
      </div>
    )
}