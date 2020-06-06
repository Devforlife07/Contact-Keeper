import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  useEffect(() => {
    // console.log(text.current.value);
    if (filtered == null) {
      text.current.value = "";
    }
  }, []);
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value != "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        placeholder="Filter Contact"
        type="text"
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
