import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import logoFooter from "@/assets/react.svg";
export function Footer() {
  return (
    <>
      <div
        id="footer"
        className="base-container bg-green-900 py-[2rem] text-white"
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={8} xs={24} md={8} lg={7}>
            <div>
              <Link id="logo-footer" to="/">
                <img src={logoFooter} alt="" />
              </Link>
              <p className="my-3 pt-5 font-semibold">Sosial Media</p>
              <div className="flex gap-3">
                <div id="facebook-icon" className="icon-footer">
                  <Link
                    to="https://www.facebook.com/"
                    target="_blank"
                    className="hover:text-green-200"
                  >
                    <FaFacebookF className="text-lg" />
                  </Link>
                </div>
                <div id="twitter-icon" className="icon-footer">
                  <Link
                    to="https://twitter.com/"
                    target="_blank"
                    className="hover:text-green-200"
                  >
                    <FaTwitter className="text-md" />
                  </Link>
                </div>
                <div id="instagram-icon" className="icon-footer">
                  <Link
                    to="https://instagram.com/radenmatputratunggal/"
                    target="_blank"
                    className="hover:text-green-200"
                  >
                    <AiFillInstagram className="text-lg" />
                  </Link>
                </div>
                <div id="youtube-icon" className="icon-footer">
                  <Link
                    to="https://youtube.com/@adhityasan16/"
                    target="_blank"
                    className="hover:text-green-200"
                  >
                    <FaYoutube className="text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col
            id="menu-footer"
            className="gutter-row"
            span={4}
            xs={12}
            md={4}
            lg={4}
          >
            <div className="list-none align-middle">
              <p className="mb-1 font-semibold">Menu</p>
              <Link to="/" id="link-to-home">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Beranda
                </p>
              </Link>
              <a href="/#tentang-kami" id="link-to-about">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Tentang Kami
                </p>
              </a>
              <a href="/#lowongan-lists-page" id="link-to-service">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Lowongan
                </p>
              </a>
              <a href="/#manfaat" id="link-to-benefit">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Manfaat
                </p>
              </a>
            </div>
          </Col>
          <Col
            id="other-menu-footer"
            className="gutter-row"
            span={4}
            xs={12}
            md={6}
            lg={5}
          >
            <div className="list-none">
              <p className="mb-1 font-semibold">Lainnya</p>
              <Link to="/ketentuan-pengguna" id="link-to-ketentuan">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Ketentuan Pengguna
                </p>
              </Link>
              <Link to="/kebijakan-privasi" id="link-to-kebijakan">
                <p className="mb-1 cursor-pointer hover:text-green-100">
                  Kebijakan Privasi
                </p>
              </Link>
              <Link to="/faq" id="link-to-faq">
                <p className="cursor-pointer hover:text-green-100">FAQ</p>
              </Link>
            </div>
          </Col>
          <Col className="gutter-row" span={8} xs={24} md={6} lg={8}>
            <div>
              <p className="font-semibold">PT Radenmat Putra Tunggal</p>
              <p>
                Jl. R. E. Martadinata No.32A, Sei Buah, Kec. Ilir Tim. II, Kota
                Palembang, Sumatera Selatan 30118
              </p>
              <p className="mt-5 font-semibold">Kontak</p>
              <p>
                Email : &nbsp;
                <Link
                  to="mailto:reprohealth@gmail.com"
                  id="email-contact-footer"
                  className="hover:text-green-200"
                >
                  radenmat@gmail.com
                </Link>
              </p>
              <p>
                No. Telp : &nbsp;
                <Link
                  to="tel:0821-8419-4757"
                  id="phone-contact-footer"
                  className="hover:text-green-200"
                >
                  0821-8419-4757
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
