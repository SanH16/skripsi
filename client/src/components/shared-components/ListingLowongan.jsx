import {
  Avatar,
  // Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Image,
  Pagination,
  Row,
  Tag,
} from "antd";

import { ListLowongan } from "@/views/app-views/rekrutmen/constant/list-lowongan";
import { splitString } from "@/utils/SplitString";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { useEffect, useState } from "react";
import { APIrekrutmen } from "@/apis/APIrekrutmen";
// import axios from "axios";

dayjs.locale("id");

export function ListingLowongan() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [dataLowongan, setDataLowongan] = useState([]);
  const sizePage = 6;
  const path = window.location.pathname;

  const [dataLowongan, setDataLowongan] = useState([]);

  useEffect(() => {
    const fetchListLowongan = async () => {
      try {
        const result = await APIrekrutmen.getAllRekrutmens();
        console.log("data rek", result);
        setDataLowongan(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListLowongan();
  }, []);

  // useEffect(() => {
  //   const fetchLowongan = async () => {
  //     try {
  //       const result = await axios.get("http://localhost:5000/rekrutmens");
  //       setDataLowongan(result?.response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchLowongan();
  // }, []);

  useScrollToTop();

  return (
    <>
      <section id="list-lowongan">
        <Row gutter={[16, 24]}>
          {dataLowongan
            // .slice((currentPage - 1) * sizePage, currentPage * sizePage)
            .map((item, i) => (
              <Col span={8} key={i} xs={24} md={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    <>
                      <Image
                        alt={item.image_desc}
                        src={item.image[0]}
                        className="h-[200px] md:h-[190px] lg:h-[200px] xl:h-[250px]"
                        preview={true}
                        fallback={ListLowongan[0].image}
                      />
                    </>
                  }
                >
                  <Tags tags={item.tags} />

                  <p className="mb-5 mt-3 line-clamp-1 font-semibold">
                    {item.title}
                  </p>

                  <Flex gap="middle">
                    {path === "/" ? (
                      <>
                        <Button type="primary">Lamar</Button>
                      </>
                    ) : (
                      <>
                        <div className="self-center">
                          <Avatar src={ListLowongan[0].ava} />
                        </div>
                        <div>
                          <h6 className="font-semibold">{item.user.name}</h6>
                          <h6 className="text-grey-200">{item.user.role}</h6>
                        </div>
                      </>
                    )}
                  </Flex>
                </Card>
              </Col>
            ))}
        </Row>
      </section>

      <footer>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                colorPrimary: "#17c6a3",
                colorPrimaryHover: "#15b494",
              },
            },
          }}
        >
          {dataLowongan.length === 0 ? null : (
            <Col>
              <Pagination
                defaultCurrent={currentPage}
                defaultPageSize={sizePage}
                total={dataLowongan?.length}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
                className="mx-auto my-10 flex justify-center md:gap-5"
              />
            </Col>
          )}
        </ConfigProvider>
      </footer>
    </>
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
