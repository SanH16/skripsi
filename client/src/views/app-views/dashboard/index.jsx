import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Welcome } from "./components/Welcome";
import { TotalCards } from "./components/TotalCards";
import { Row, Col } from "antd";

export default function Dashboard() {
  useDocumentTitle("Dashboard");
  useScrollToTop();

  return (
    <div className="mb-5 py-5">
      <Welcome />
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <TotalCards />
        </Col>
      </Row>
    </div>
  );
}
