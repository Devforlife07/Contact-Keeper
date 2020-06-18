import React, { useContext, Fragment, useEffect } from "react";
import ContactContacts from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./contactItem.jsx";
import Spinner from "../spinner/spinner.jsx";

const Contacts = () => {
  const contactContext = useContext(ContactContacts);
  const { contacts, filtered, getContacts, loading } = contactContext;
  // console.log(filtered);
  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts.length == 0 && !loading) return <h1>Please Add A Contact</h1>;

  return (
    <Fragment>
      {contacts != null && !loading ? (
        <TransitionGroup>
          {filtered != null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item "
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
