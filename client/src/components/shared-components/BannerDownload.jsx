import { Row, Col } from "antd";

import { ButtonGooglePlay } from "@/components/shared-components/ButtonGooglePlay";
import { ButtonAppStore } from "@/components/shared-components/ButtonAppStore";

import handPhone from "@/assets/handphone-2.png";

export function BannerDownload() {
  return (
    <>
      <div
        id="banner-download"
        className="rounded-lg bg-green-50 bg-vector-header-2 px-5 pt-5 sm:bg-no-repeat md:pt-0"
      >
        <Row align="middle">
          <Col span={6} xs={0} md={6} align="center">
            <img src={handPhone} alt="handphone" />
          </Col>
          <Col span={18} xs={24} sm={18}>
            <Row align="middle">
              <Col span={24} lg={16} xl={18}>
                <h4 className="font-bold text-green-900">
                  Dapatkan Penawaran Spesial Seragam Terbaik! Hanya di Radenmat
                </h4>
                <h5 className="font-semibold text-grey-400">
                  Mitra Tepat, Solusi Akurat!
                </h5>
              </Col>
              <Col span={24} lg={8} xl={6} className="my-md-0 my-4">
                <Row>
                  <Col span={24} xs={12} md={10} lg={24} align="center">
                    <ButtonGooglePlay />
                  </Col>
                  <Col span={24} xs={12} md={10} lg={24} align="center">
                    <ButtonAppStore />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={0} align="center">
            <img src={handPhone} alt="handphone" />
          </Col>
        </Row>
      </div>
    </>
  );
}
