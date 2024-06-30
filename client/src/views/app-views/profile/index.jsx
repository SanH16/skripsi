import { Col, Row } from "antd";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import UserProfile from "./components/UserProfile";

export default function Profile() {
  useDocumentTitle("Profil");
  useScrollToTop();
  return (
    <section className="mb-5 py-5">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <UserProfile />
        </Col>
        <Col span={24}>{/* <TabsDoctor /> */}</Col>
      </Row>
    </section>
  );
}
