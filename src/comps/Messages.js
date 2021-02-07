import React from 'react';

export default function Message({ id, name, msg, d, t }) {

  // display date or time depending on if it's today
  function dt(d, t) { 
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    var checkdate = d;
    if (yyyy + '-' + mm + '-' + dd === checkdate) checkdate = t;
    return checkdate;
  }

  return (
    <div className="message">
      <div className="title"><span className="name">{name}</span> {dt(d, t)} </div>
      <div className="content"><span className="id">#{id}</span>{msg} </div>
    </div>
  );
}