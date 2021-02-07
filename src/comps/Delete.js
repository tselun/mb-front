// author: stephen chiu
// date: feb 6, 2021
// about: component to delete message

import React, { useState } from 'react';

export default function Delete() { 

    const [counter, setCounter] = useState(0);

    function placeOrder(form){
        form.submit();
        setCounter(counter + 1);
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