import type { Role, User } from "@/shared/types";
import { Form, Input, Modal, Select, Grid } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

interface UserFormProps {
  open: boolean;
  editingUser: User | null;
  loading: boolean;
  onSubmit: (values: Omit<User, "id">) => Promise<void>;
  onCancel: () => void;
}

const ROLES: Role[] = ["PAYMENT", "REPORTS"];
const NAME_REGEX = /^[a-zA-ZА-Яа-яЁёÀ-ÿ\u0400-\u04FF ''-]+$/;
const PASSWORD_UPPER = /[A-Z]/;
const PASSWORD_SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export default function UserForm({
  open,
  editingUser,
  loading,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  useEffect(() => {
    if (open) {
      if (editingUser) {
        form.setFieldsValue({
          firstName: editingUser.firstName,
          lastName: editingUser.lastName,
          email: editingUser.email,
          roles: editingUser.roles,
          password: "",
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, editingUser, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser && !values.password) {
        const { password: _, ...rest } = values;
        await onSubmit(rest as Omit<User, "id">);
      } else {
        await onSubmit(values as Omit<User, "id">);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errorFields" in err) return;
      throw err;
    }
  };

  return (
    <Modal
      open={open}
      title={editingUser ? t("users.editUser") : t("users.addUser")}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnHidden
      width={isMobile ? "94vw" : 480}
      styles={{
        body: {
          maxHeight: "72vh",
          overflowY: "auto",
          paddingRight: 4,
        },
      }}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 8 }}
        validateTrigger={["onBlur", "onChange"]}
      >
        {/* Ism */}
        <Form.Item
          name="firstName"
          label={t("users.firstName")}
          rules={[
            { required: true, message: t("users.firstNameRequired") },
            { min: 2, message: t("users.firstNameMin") },
            { max: 50, message: t("users.firstNameMax") },
            { pattern: NAME_REGEX, message: t("users.firstNameLetters") },
          ]}
        >
          <Input
            placeholder={t("users.firstName")}
            maxLength={50}
            showCount
            size={isMobile ? "large" : "middle"}
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={t("users.lastName")}
          rules={[
            { required: true, message: t("users.lastNameRequired") },
            { min: 2, message: t("users.lastNameMin") },
            { max: 50, message: t("users.lastNameMax") },
            { pattern: NAME_REGEX, message: t("users.lastNameLetters") },
          ]}
        >
          <Input
            placeholder={t("users.lastName")}
            maxLength={50}
            showCount
            size={isMobile ? "large" : "middle"}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("users.email")}
          rules={[
            { required: true, message: t("users.emailRequired") },
            { type: "email", message: t("users.emailInvalid") },
          ]}
        >
          <Input
            placeholder="user@example.com"
            autoComplete="off"
            disabled={!!editingUser}
            size={isMobile ? "large" : "middle"}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("users.password")}
          extra={
            editingUser ? t("users.passwordEditHint") : t("users.passwordHint")
          }
          rules={[
            ...(!editingUser
              ? [{ required: true, message: t("users.passwordRequired") }]
              : []),
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                if (value.length < 8)
                  return Promise.reject(t("users.passwordMin"));
                if (!PASSWORD_UPPER.test(value))
                  return Promise.reject(t("users.passwordUpper"));
                if (!PASSWORD_SPECIAL.test(value))
                  return Promise.reject(t("users.passwordSpecial"));
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            placeholder={
              editingUser ? t("users.passwordPlaceholder") : t("users.password")
            }
            autoComplete="new-password"
            size={isMobile ? "large" : "middle"}
          />
        </Form.Item>

        <Form.Item
          name="roles"
          label={t("users.roles")}
          extra={t("users.rolesHint")}
          rules={
            !editingUser
              ? [{ required: true, message: t("users.rolesRequired") }]
              : []
          }
        >
          <Select
            mode="multiple"
            placeholder={t("users.roles")}
            options={ROLES.map((r) => ({ label: r, value: r }))}
            allowClear
            style={{ width: "100%" }}
            size={isMobile ? "large" : "middle"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
