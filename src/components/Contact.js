import React from "react";

const Contact = () => {
  return <section id="contact">
    <form id="contact-form"  method="POST">
    <div className="form-group">
    <h3>Contact</h3>
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </section>;
};

export default Contact;