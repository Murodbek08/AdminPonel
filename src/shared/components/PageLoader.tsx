import { Flex, Spin } from "antd";

export default function PageLoader() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin size="large" tip="Yuklanmoqda..." />
    </Flex>
  );
}
