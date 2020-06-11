import React, { useState, useEffect, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContatctForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        phone: "",
        types: "",
        email: "",
      });
    }
  }, [contactContext, current]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    types: "personal",
  });
  const { name, email, phone, types } = contact;
  const onChange = (e) => {
    console.log(e.target.name);
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const clearAll = () => {
    clearCurrent();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current == null) {
      addContact(contact);
      console.log(contact);
    } else {
      updateContact(contact);
    }

    setContact({
      name: "",
      phone: "",
      types: "",
      email: "",
    });
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="types"
        value="personal"
        checked={types == "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="types"
        value="professional"
        checked={types == "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
        {current && (
          <div>
            {" "}
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear
            </button>{" "}
          </div>
        )}
      </div>
    </form>
  );
};
export default ContatctForm;
