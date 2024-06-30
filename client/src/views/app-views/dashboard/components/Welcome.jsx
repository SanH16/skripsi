import { Col, Row, Skeleton } from "antd";
import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export function Welcome() {
  const userState = useSelector(selectGetUserLogin);
  const userName = userState?.data?.name;
  return (
    <Row justify="space-between">
      <Col xs={24} md={12}>
        {userState.status === "loading" && (
          <Skeleton.Input
            active
            className="mb-5 block h-[15px] w-[350px] sm:mb-0 sm:w-[400px] xl:my-3"
          />
        )}
        {userState.status === "success" && (
          <h4 id="welcome-doctor" className="mb-4 block font-semibold">
            Selamat Datang, {userName?.split(",")[0]}!
          </h4>
        )}
        {userState.status === "failed" && (
          <h4 id="welcome-doctor" className="mb-4 block font-semibold">
            Selamat Datang!
          </h4>
        )}
      </Col>
    </Row>
  );
}
