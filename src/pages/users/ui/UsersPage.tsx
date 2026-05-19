import { useState } from "react";
import { Typography, Pagination, Alert } from "antd";
import { useTranslation } from "react-i18next";
import type { User } from "@/shared/types";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "@/entities/user";
import { getApiError, notify } from "@/shared/utils";
import UsersToolbar from "./UsersToolbar";
import { EmptyState, PageSkeleton } from "@/shared/components";
import { UserForm, UserTable } from "@/features/users";

const { Title } = Typography;

export default function UsersPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, isLoading, isError, error } = useUsers({
    page,
    pageSize: 10,
    search,
  });

  const { mutateAsync: createUser, isPending: creating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: updating } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      notify.success(t("users.deleteSuccess"));
    } catch (err) {
      notify.error(getApiError(err, t("common.error")));
    }
  };

  const handleSubmit = async (values: Omit<User, "id">) => {
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, data: values });
        notify.success(t("users.updateSuccess"));
      } else {
        await createUser(values);
        notify.success(t("users.createSuccess"));
      }
      setModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      notify.error(getApiError(err, t("common.error")));
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>
        {t("users.title")}
      </Title>

      <UsersToolbar
        search={search}
        onSearch={handleSearch}
        onAdd={handleAdd}
        loading={isLoading}
      />

      {isLoading && <PageSkeleton />}

      {isError && !isLoading && (
        <Alert
          type="error"
          message={getApiError(error, t("common.error"))}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {!isLoading && !isError && data?.data?.length === 0 && (
        <EmptyState text={t("common.noData")} />
      )}

      {!isLoading && !isError && (data?.data?.length ?? 0) > 0 && (
        <>
          <UserTable
            data={data?.data ?? []}
            loading={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {(data?.total ?? 0) > 10 && (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                current={page}
                total={data?.total}
                pageSize={10}
                onChange={setPage}
                showSizeChanger={false}
                showTotal={(total) => `${t("users.total")}: ${total}`}
                size="small"
              />
            </div>
          )}
        </>
      )}

      <UserForm
        open={modalOpen}
        editingUser={editingUser}
        loading={creating || updating}
        onSubmit={handleSubmit}
        onCancel={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
      />
    </div>
  );
}
