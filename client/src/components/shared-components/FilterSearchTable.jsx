import { Col, Form, Input, Row, ConfigProvider, Button, Tooltip } from "antd";
import { BsSearch } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdPrint } from "react-icons/md";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export function FilterSearchTable({
  setSearchValue,
  title,
  placeholder,
  handleDownloadExcel,
  handleDownloadPdf,
}) {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <Form layout="vertical">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorPrimary: "#17c6a3",
              },
              Select: {
                colorPrimary: "#17c6a3",
                colorPrimaryBorderHover: "#17c6a3",
                colorPrimaryHover: "#17c6a3",
              },
            },
          }}
        >
          <Row gutter={[16, 8]}>
            <Col span={24} md={16}>
              <p
                id="absensi-table-title"
                className="mb-4 text-2xl font-semibold"
              >
                {title}
              </p>
            </Col>
            <Col span={6} className="text-end">
              <Form.Item id="search-absensi" name="search">
                <Input
                  placeholder={`Cari ${placeholder}...`}
                  allowClear
                  prefix={<BsSearch className="me-1 text-gray-400" />}
                  className="h-[2.1rem] hover:border-green-500"
                  onChange={handleSearchChange}
                />
              </Form.Item>
            </Col>
            {verifRole ? (
              <Col span={2}>
                <Tooltip title="Download Excel">
                  <Button
                    onClick={handleDownloadExcel}
                    className="h-[30px] w-[32px] rounded-lg border-green-500 p-0 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <RiFileExcel2Line className="text-[20px]" />
                  </Button>
                </Tooltip>
                <Tooltip title="Download PDF">
                  <Button
                    onClick={handleDownloadPdf}
                    className="ms-3 h-[30px] w-[32px] rounded-lg border-green-500 p-0 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <MdPrint className="text-[20px]" />
                  </Button>
                </Tooltip>
              </Col>
            ) : null}
          </Row>
        </ConfigProvider>
      </Form>
    </>
  );
}
