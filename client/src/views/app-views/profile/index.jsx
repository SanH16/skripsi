import { Col, Row } from "antd";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import UserProfile from "./components/UserProfile";
import UserTable from "./misc/UserTable";
import { TabsUser } from "./misc/TabsUser";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export default function Profile() {
  useDocumentTitle("Profil");
  useScrollToTop();

  const stateDataUser = useSelector(selectGetUserLogin);
  const dataUser = stateDataUser?.data;

  return (
    <section className="mb-5 py-5">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <UserProfile />
        </Col>
        <Col span={24}>
          {dataUser?.role === "admin" ? <UserTable /> : <TabsUser />}
        </Col>
      </Row>
    </section>
  );
}
