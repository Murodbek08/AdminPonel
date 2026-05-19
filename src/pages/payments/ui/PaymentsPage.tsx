import { useState } from "react";
import { Typography, Pagination, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { usePayments } from "@/entities/payment";
import PaymentsToolbar from "./PaymentsToolbar";
import { EmptyState, PageSkeleton } from "@/shared/components";
import { getApiError } from "@/shared/utils";
import PaymentsTable from "./PaymentsTable";

const { Title } = Typography;

export default function PaymentsPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, error } = usePayments({
    page,
    pageSize: 10,
    search,
    status: status || undefined,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>
        {t("payments.title")}
      </Title>

      <PaymentsToolbar
        search={search}
        status={status}
        onSearch={handleSearch}
        onStatus={handleStatus}
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
          <PaymentsTable data={data?.data ?? []} loading={false} />

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
                showTotal={(total) =>
                  `${t("payments.total") ?? "Jami"}: ${total}`
                }
                size="small"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
