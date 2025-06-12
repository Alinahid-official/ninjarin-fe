import UserActions from "@/redux/user/actions";
import { InputNumber, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useDispatch } from "react-redux";

const proficiencyLevels = [
  { value: "not_applicable", label: "Not Applicable" },
  { value: "1_basic", label: "1 - Basic" },
  { value: "2_intermediate", label: "2 - Intermediate" },
  { value: "3_proficient", label: "3 - Proficient" },
  { value: "4_advanced", label: "4 - Advanced" },
  { value: "5_mastery", label: "5 - Mastery" },
];
const EditableSkillField = ({ name, value, placeholder, skillId }) => {
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch(UserActions.updateSkillProfile(skillId, { [name]: value }));
  };
  if (name !== "selfAssessment") {
    return (
      <InputNumber
        placeholder={placeholder}
        style={{ width: "70px" }}
        min={0}
        max={50}
        value={value}
        onChange={(value) => onChange(value)}
      />
    );
  }
  return (
    <Select
      value={value === "select" ? undefined : value}
      placeholder={placeholder}
      style={{ width: "100%" }}
      onChange={(value) => onChange(value)}
    >
      {value === "select" && (
        <Option key="select_placeholder" value="select" disabled>
          Select
        </Option>
      )}
      {proficiencyLevels.map((level) => (
        <Option key={level.value} value={level.value}>
          {level.label}
        </Option>
      ))}
    </Select>
  );
};

export default EditableSkillField;
