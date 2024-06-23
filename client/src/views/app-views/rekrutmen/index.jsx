import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Rekrutmen() {
  return (
    <>
      <div className="mb-5 py-5">
        <Row justify="space-between" className="mb-5" align="middle">
          <Col span={12}>
            <h3 className="font-bold">Lowongan Kerja</h3>
          </Col>
          <Col>
            <Link to="/upload-rekrutmen">
              <Button
                id="write-rekrutmen"
                type="primary"
                className="flex bg-green-500"
              >
                Buat Lowongan
                <span className="ms-1 text-lg">
                  <MdOutlineFileUpload />
                </span>
              </Button>
            </Link>
          </Col>
        </Row>
        {/* <ListArticle /> */}
      </div>
    </>
  );
}
