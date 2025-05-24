import React from "react";
import EditableInputField from "../../../../../components/common/EditableInputField";
import { useDispatch } from "react-redux";
import SkillArchitectureActions from "@/redux/skillArchitecture/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { useSelector } from "react-redux";
import CustomerActions from "@/redux/customer/actions";

const EditableLabelField = ({
  value,
  rules = [],
  name,
  type = "text",
  active = false,
  labelId,
  customerId,
  children,
}) => {
  const loading = useSelector((state) =>
    requestingSelector(state, [SkillArchitectureActions.UPDATE_LABEL], name)
  );
  const dispatch = useDispatch();
  const onSubmit = (value) => {
    dispatch(
      SkillArchitectureActions.updateLabel(
        labelId,
        customerId,
        {
          [name]: {
            label: value[name],
            isActive: true,
          },
        },
        name
      )
    );
  };

  return (
    <div className="editable-label-field">
      <EditableInputField
        type={type}
        value={value}
        onSubmit={onSubmit}
        rules={rules}
        name={name}
        active={active}
        loading={loading}
      >
        {children || <span>{value}</span>}
      </EditableInputField>
    </div>
  );
};

export default EditableLabelField;
