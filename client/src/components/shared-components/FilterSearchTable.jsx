import { Col, Form, Input, Row, ConfigProvider } from "antd";
import { BsSearch } from "react-icons/bs";

export function FilterSearchTable({ setSearchValue, title, placeholder }) {
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
            <Col span={24} md={10}>
              <p
                id="absensi-table-title"
                className="mb-4 text-2xl font-semibold"
              >
                {title}
              </p>
            </Col>
            <Col
              span={24}
              md={{ span: 8, offset: 2 }}
              lg={{ span: 7, offset: 4 }}
              xl={{ span: 6, offset: 6 }}
              className="text-end"
            >
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
          </Row>
        </ConfigProvider>
      </Form>
    </>
  );
}
