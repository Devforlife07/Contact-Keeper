import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext.jsx";
const Alert = () => {
  const alertContext = useContext(AlertContext);
  {
    console.log(alertContext.alerts);
  }
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i>
        {alert.message}
      </div>
    ))
  );
};
export default Alert;
