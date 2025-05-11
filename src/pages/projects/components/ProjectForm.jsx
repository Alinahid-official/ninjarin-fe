import FullAlertError from "@/components/error/FullAlertError";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import ProjectActions from "@/redux/project/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { Form, Input, Select, DatePicker, Button, Space, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import CustomerActions from "@/redux/customer/actions";

const selectError = makeSelectErrorModel();
const ProjectForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) =>
    requestingSelector(state, [ProjectActions.ADD_PROJECT])
  );
  const error = useSelector((state) =>
    selectError(state, [ProjectActions.ADD_PROJECT_FINISHED])
  );
  const customers = useSelector(CustomerSelectors.getCustomers);

  const projectTypes = [
    { value: "Career Mapping", label: "Career Mapping" },
    { value: "Recruitment", label: "Recruitment" },
    { value: "Learning & Development", label: "Learning & Development" },
    { value: "Leadership Development", label: "Leadership Development" },
    { value: "Succession Planning", label: "Succession Planning" },
    { value: "Change Management", label: "Change Management" },
    { value: "Assessment", label: "Assessment" },
  ];

  const projectStages = [
    { value: "Consulting", label: "Consulting" },
    { value: "Design", label: "Design" },
    { value: "Development", label: "Development" },
    { value: "Delivered", label: "Delivered" },
    { value: "Services", label: "Services" },
    { value: "Maintenance", label: "Maintenance" },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const users = [
    { value: "Om prakash sao", label: "Om prakash sao" },
    { value: "Neilsan mando", label: "Neilsan mando" },
    { value: "Tivonty priya", label: "Tivonty priya" },
    { value: "Martie hannery", label: "Martie hannery" },
    { value: "Sukamar rao", label: "Sukamar rao" },
  ];

  useEffect(() => {
    dispatch(CustomerActions.getCustomers());
  }, []);

  useEffect(() => {
    if (loading !== false && !error) {
      onCancel();
    }
  }, [loading]);

  const customerOptions = customers?.map((customer) => ({
    value: customer._id,
    label: customer.name,
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
      initialValues={{
        name: "New Project",
        organization: customerOptions ? customerOptions[0].value : "",
        cxOwner: "Om prakash sao",
        programManager: "Om prakash sao",
        cxAdmin: "Om prakash sao",
        projectType: "Career Mapping",
        projectStage: "Consulting",
        dueDate: dayjs().add(30, "days"),
      }}
    >
      {error && <FullAlertError error={error} />}
      <div style={{ height: "calc(100% - 80px)", overflowY: "auto" }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter project name" }]}
        >
          <Input size="large" placeholder="Project name" />
        </Form.Item>

        <Form.Item
          label="Organization"
          name="organization"
          rules={[{ required: true, message: "Please select organization" }]}
        >
          <Select
            size="large"
            placeholder="Select clients"
            options={customerOptions}
            // loading={!customers.length}
          />
        </Form.Item>

        <Form.Item
          label="CX Owner"
          name="cxOwner"
          rules={[{ required: true, message: "Please select CX Owner" }]}
        >
          <Select
            size="large"
            placeholder="Select CX Owner"
            options={users}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Program Manager"
          name="programManager"
          rules={[{ required: true, message: "Please select Program Manager" }]}
        >
          <Select
            size="large"
            placeholder="Select Manager"
            options={users}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="CX Admin"
          name="cxAdmin"
          rules={[{ required: true, message: "Please select CX Admin" }]}
        >
          <Select
            size="large"
            placeholder="Select CX Admin"
            options={users}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Project Type"
          name="projectType"
          rules={[{ required: true, message: "Please select Project Type" }]}
        >
          <Select
            size="large"
            placeholder="Select Project Type"
            options={projectTypes}
          />
        </Form.Item>

        <Form.Item
          label="Project Stage"
          name="projectStage"
          rules={[{ required: true, message: "Please select Project Stage" }]}
        >
          <Select
            size="large"
            placeholder="Select Project Stage"
            options={projectStages}
          />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select Due Date" }]}
        >
          <DatePicker
            size="large"
            style={{ width: "100%" }}
            placeholder="Select Due Date"
          />
        </Form.Item>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #f0f0f0",
          padding: "24px 0",
          right: 0,
          backgroundColor: "#F7F7F7",
        }}
      >
        <Flex
          style={{
            padding: "0px 48px 0px 48px",
          }}
          gap={20}
        >
          <Button size="large" block onClick={onCancel}>
            Cancel
          </Button>
          <Button
            loading={loading}
            size="large"
            block
            type="primary"
            onClick={handleSubmit}
          >
            Add Project
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default ProjectForm;
