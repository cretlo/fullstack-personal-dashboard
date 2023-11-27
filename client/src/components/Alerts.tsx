import { useAlertContext } from "../contexts/AlertContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Alerts = () => {
    const alertContext = useAlertContext();

    const { alerts } = alertContext;

    return (
        <ToastContainer
            style={{ zIndex: "100" }}
            className="position-absolute bottom-0 translate-middle start-50 pb-5"
        >
            {alerts.length > 0 &&
                alerts.map((alert) => (
                    <Toast key={alert.id} bg={alert.type} delay={3000} autohide>
                        <Toast.Body className="text-white">
                            {alert.message}
                        </Toast.Body>
                    </Toast>
                ))}
        </ToastContainer>
    );
};

export default Alerts;
