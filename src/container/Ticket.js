import React, { useState } from "react";
import "./Ticket.css";

const Ticket = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div>
      <div className="tic_title">Ticket</div>
      <div className="ticket_main">
        {/* <p>Name</p>
        <input className="form-control" type="text" id="name" required /> */}
        <form className="form_style">
          <div>
            <label style={{ fontWeight: "500" }}>Order no.</label>
            <input
              className="form-control"
              type="text"
              autoFocus="true"
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "500" }}>Product name</label>
            <input className="form-control" type="Product name" required />
          </div>
          <div>
            <label style={{ fontWeight: "500" }}>Subject</label>
            <input className="form-control" required />
          </div>
          <div>
            <label style={{ fontWeight: "500" }}>Product description</label>
            <textarea className="form-control" required />
          </div>
          <div className="App">
            <br />
            <h5>Add Image:</h5>
            <input type="file" onChange={handleChange} />
            <img src={file} />
          </div>
          <br />
          <button className="tic_btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ticket;
