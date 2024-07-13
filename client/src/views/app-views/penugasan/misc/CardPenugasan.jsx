import { RiChatHistoryLine } from "react-icons/ri";

import { Card, Col, Flex, Row } from "antd";

export function CardPenugasan({ data }) {
  const penugasanToday = data?.filter(
    (item) =>
      new Date(item.createdAt).toDateString() === new Date().toDateString(),
  );

  return (
    <>
      <Row gutter={[16, 16]} className="mb-4" id="mutasi-card">
        <Col id="total-cards" span={6} xs={24} md={8} lg={7}>
          <Card hoverable className="hover:shadow-md">
            <div className="grid h-20 content-between">
              <Flex justify="space-between" align="flex-start">
                <div>
                  <p id="total-card-title" className="me-0 font-medium lg:me-3">
                    Data Penugasan hari ini
                  </p>
                  <h4 id="total-item" className="font-bold">
                    {penugasanToday?.length}
                  </h4>
                </div>
                <div className="grid h-16 w-16 place-content-center rounded-lg bg-green-50">
                  <RiChatHistoryLine className="text-[50px] text-green-300 duration-100 hover:text-[60px]" />
                </div>
              </Flex>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
