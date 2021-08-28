import React, { useContext } from "react";

import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactIttem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase(0) + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && <li>{email}</li>}
        {phone && <li>{phone}</li>}
      </ul>
      <p>
        <button
          className="btn btn-sm btn-dark"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
ContactIttem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactIttem;
