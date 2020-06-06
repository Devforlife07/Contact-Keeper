import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext.jsx";
const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { Register, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      console.log(props.history.push);
      props.history.push("/home");
    }
    if (error === "User Already Exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name == "" || email == "" || password == "") {
      setAlert("Please Enter All Fields", "danger");
    } else if (password != password2) {
      setAlert("Passwords Do Not Match", "danger");
    } else {
      Register({ name, email, password });
    }
  };
  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>
        Account <span className="text-success">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            minLength="6 "
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            required
            name="password2"
            value={password2}
            required
            minLength="6"
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Register"
        />
      </form>
    </div>
  );
};
export default Register;
