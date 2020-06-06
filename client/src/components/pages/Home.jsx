import React, { useContext } from "react";
import Contacts from "../contacts/contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/contactFilter.jsx";
import AuthContext from "../../context/auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};
export default Home;
