import { Alert } from "antd";
import "./style.scss";
import { removeByActionType } from "@/redux/error/errorAction";
import { getKeyForAction } from "@/utilities/actionUtility";
import moment from "moment";
import { STANDARD_DATE_TIME_FORMAT } from "@/utilities/time";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const ErrorContent = ({ label, value }) => {
  return (
    <div className="error_content_container">
      <p className="heading4 error_content_label">{label}</p> :
      <p className="heading4 error_content_value">{value}</p>
    </div>
  );
};

ErrorContent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const FullAlertError = ({ error }) => {
  if (!error || !error?.errors) return null;

  const dispatch = useDispatch();

  const description = (
    <div>
      {error?.errors.map((err, index) => (
        <div className="error_alert_container" key={index}>
          <p className="heading3 error_count_text">#{index}</p>
          <div>
            <ErrorContent label="Error" value={err.error} />

            <ErrorContent
              label="Message"
              value={
                err.message && typeof err.message === "string"
                  ? err.message
                  : "-"
              }
            />

            <ErrorContent label="Exception" value={error.exception} />
            <ErrorContent label="Code" value={error.code} />
            <ErrorContent
              label="Time"
              value={moment(error.timestamp).format(STANDARD_DATE_TIME_FORMAT)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const handleClose = () => {
    dispatch(
      removeByActionType(getKeyForAction(error?.actionType, error?.scope))
    );
  };

  return (
    <Alert
      message="Error details"
      description={description}
      type="error"
      showIcon
      closable
      onClose={handleClose}
      style={{ marginBottom: "20px" }}
    />
  );
};

FullAlertError.propTypes = {
  error: PropTypes.shape({
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        error: PropTypes.string,
        message: PropTypes.string,
      })
    ),
    exception: PropTypes.string,
    code: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    actionType: PropTypes.string,
    scope: PropTypes.string,
  }),
};

export default FullAlertError;
