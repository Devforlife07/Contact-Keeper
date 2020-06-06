import React, { useContext, Fragment } from "react";
import ContactContacts from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./contactItem.jsx";

const Contacts = () => {
  const contactContext = useContext(ContactContacts);
  const { contacts, filtered } = contactContext;
  if (contacts.length == 0) return <h1>Please Add A Contact</h1>;
  return (
    <Fragment>
      <TransitionGroup>
        {filtered != null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item ">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
