import { useAlertContext } from "../contexts/AlertContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Alerts = () => {
  const alertContext = useAlertContext();

  const { alerts } = alertContext;

  return (
    <div
      style={{
        zIndex: "-1",
        minHeight: "100vh",
        minWidth: "100vw",
        top: "0",
      }}
      className="position-absolute"
    >
      <ToastContainer position="bottom-center" className="pb-5">
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <Toast key={alert.id} bg={alert.type} delay={3000} autohide>
              <Toast.Body className="text-white">{alert.message}</Toast.Body>
            </Toast>
          ))}
      </ToastContainer>
    </div>
  );
};

export default Alerts;
