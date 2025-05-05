import { Alert } from "antd";
import PropTypes from 'prop-types';

const AlertError = ({ error, message }) => {
  if (!error && !message) return null;

  if (!message && error?.errors) {
    return error.errors.map(
      (err, index) =>
        err.message && (
          <Alert
            key={err.message + index}
            message={err.message}
            type="error"
            closable
            style={{ marginBottom: "10px" }}
          />
        )
    );
  }

  return (
    <Alert
      message={
        message ? message : "There was an error while processing your request."
      }
      type="error"
      closable
      style={{ marginBottom: "20px" }}
    />
  );
};

AlertError.propTypes = {
  error: PropTypes.shape({
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string
      })
    )
  }),
  message: PropTypes.string
};

export default AlertError;