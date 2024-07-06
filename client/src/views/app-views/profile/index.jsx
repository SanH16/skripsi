import { Button, Col, Row } from "antd";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import UserProfile from "./components/UserProfile";
import UserTable from "./misc/UserTable";
import { TabsUser } from "./misc/TabsUser";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useState } from "react";

export default function Profile() {
  useDocumentTitle("Profil");
  useScrollToTop();

  const stateDataUser = useSelector(selectGetUserLogin);
  const dataUser = stateDataUser?.data;
  const verifRole = dataUser?.role === "admin";

  const [isUserTable, setIsUserTable] = useState(true); // state untuk melacak tabel yang ditampilkan

  const toggleTable = () => {
    setIsUserTable(!isUserTable);
  };

  return (
    <section className="mb-5 py-5">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <UserProfile />
          {verifRole ? (
            <Button
              type="primary"
              className={
                isUserTable
                  ? `mt-3 animate-bounce`
                  : `mt-3 border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white`
              }
              onClick={toggleTable}
            >
              {isUserTable ? "Data Pegawai" : "Data User"}
            </Button>
          ) : null}
        </Col>
        <Col span={24}>
          {verifRole ? <UserTable isUserTable={isUserTable} /> : <TabsUser />}
        </Col>
      </Row>
    </section>
  );
}
