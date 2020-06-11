import React, {
    useReducer
} from "react"
// import {
//     v4 as uuidv4
// } from "uuid";
import ContactContext from "./contactContext.js";
import contactReducer from "./contactReducer";
import Axios from "axios"
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from "../Types"
const ContactState = (props) => {
    const initialState = {
        contacts: [

        ],
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);
    //Add Contacts
    const addContact = async contact => {
        // contact.id = uuidv4();
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        try {
            const res = await Axios.post("/api/contacts", contact, config);
            console.log(res)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (e) {
            console.log(e)
            dispatch({
                type: "CONTACT_ERROR",
                payload: e.response.msg
            })
        }

    }
    //Get Contacts
    const getContacts = async () => {
        try {
            const res = await Axios.get("/api/contacts")
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "CONTACT_ERROR",
                payload: error.response.payload
            })
        }
    }

    //Delete Contacts
    const deleteContact = id => {

        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }


    return ( <
        ContactContext.Provider value = {
            {
                contacts: state.contacts,
                addContact,
                deleteContact,
                current: state.current,
                error: state.error,
                setCurrent,
                clearCurrent,
                updateContact,
                filtered: state.filtered,
                filterContacts,
                clearFilter,
                getContacts
            }
        } > {
            props.children
        } < /ContactContext.Provider>
    )
}
export default ContactState;