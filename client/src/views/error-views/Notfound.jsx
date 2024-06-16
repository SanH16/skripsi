import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

import imageNotfound from "@/assets/notfound.svg";

export default function Notfound() {
  return (
    <>
      <section className="flex h-screen items-center justify-center text-center">
        <Row justify="center">
          <Col sm={24} md={12}>
            <img
              src={imageNotfound}
              className="m-auto h-48 md:h-56 lg:h-60 xl:h-72"
            />
          </Col>
          <Col span={24}>
            <div className="mt-7">
              <h4 className="text-lg lg:text-2xl">Halaman Tidak Ditemukan!</h4>
              <p className="mb-6 mt-2 text-grey-300 lg:text-sm">
                Link halaman yang anda tuju tidak ditemukan di server ini.
              </p>
              <Link to="/">
                <Button
                  id="btn-error-notfound"
                  type="primary"
                  className="h-[50px] px-10 font-medium"
                >
                  Kembali ke halaman utama
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
