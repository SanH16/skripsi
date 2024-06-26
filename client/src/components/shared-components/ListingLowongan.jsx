import { Avatar, Card, Col, Flex, Image, Row, Tag } from "antd";
import { ListLowongan as dataLowongan } from "@/views/app-views/rekrutmen/constant/list-lowongan";
import { splitString } from "@/utils/SplitString";

import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export function ListingLowongan() {
  return (
    <section id="list-lowongan">
      <Row gutter={[16, 24]}>
        {dataLowongan.map((item, i) => (
          <Col span={8} key={i}>
            <Card
              hoverable
              cover={
                <>
                  <Image
                    alt={item.image_desc}
                    src={item.image}
                    className="h-[200px] md:h-[190px] lg:h-[200px] xl:h-[250px]"
                    preview={false}
                    fallback={dataLowongan[0].image}
                  />
                </>
              }
            >
              <Tags tags={item.tags} />

              <p className="my-3 pb-2 font-semibold">{item.title}</p>
              <Flex gap="middle">
                <div className="self-center">
                  <Avatar src={item.ava} />
                </div>
                <div>
                  <h6 className="font-semibold">{item.author}</h6>
                  <h6 className="text-grey-200">{item.date}</h6>
                </div>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

const Tags = ({ tags }) => {
  const tagsList = splitString(tags);
  return (
    <>
      {tagsList?.map((tag, index) => (
        <Tag
          key={index}
          className="mb-2 rounded-lg border-none bg-green-100 px-3 py-1 text-sm font-medium capitalize text-green-600"
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};
