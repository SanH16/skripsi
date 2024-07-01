import {
  Avatar,
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
import { MdOutlineFileUpload } from "react-icons/md";

import { ListLowongan } from "@/views/app-views/rekrutmen/constant/list-lowongan";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { splitString } from "@/utils/SplitString";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { useEffect, useState } from "react";
import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { Link } from "react-router-dom";

dayjs.locale("id");
import parse from "html-react-parser";

import { authService } from "@/configs/auth";

export function ListingLowongan() {
  const isAuthenticated = authService.isAuthorized();
  const [isLoading, setIsLoading] = useState(false);

  const [dataLowongan, setDataLowongan] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const sizePage = 6;

  const path = window.location.pathname;

  useDocumentTitle("List Lowongan");
  useScrollToTop();

  useEffect(() => {
    setIsLoading(true);
    const fetchListLowongan = async () => {
      try {
        const result = await APIrekrutmen.getAllRekrutmens(currentPage);

        // console.log("data rek", result);
        setDataLowongan(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchListLowongan();
  }, [currentPage]);

  const handleLamarClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("di klik");
  };

  return (
    <>
      <section id="list-lowongan">
        <Row gutter={[16, 24]}>
          {dataLowongan
            .slice((currentPage - 1) * sizePage, currentPage * sizePage)
            .map((item, i) => (
              <Col span={8} key={i} xs={24} md={12} lg={8}>
                <Link
                  to={
                    isAuthenticated
                      ? `/detail-lowongan/${item.uuid}`
                      : `/lowongan/${item.uuid}`
                  }
                >
                  <Card
                    loading={isLoading}
                    hoverable
                    cover={
                      <>
                        <Image
                          alt={item.image_desc}
                          src={item?.image.data}
                          className="h-[200px] md:h-[190px] lg:h-[200px] xl:h-[250px]"
                          preview={true}
                          onClick={handleLamarClick}
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
                      {path === "/" && !isAuthenticated ? (
                        <>
                          <div className="justify-end">
                            <div className="mb-1 self-center">
                              <h6 className="line-clamp-1 text-grey-200">
                                {parse(`${item?.text_desc}`)}
                              </h6>
                            </div>

                            <Button onClick={handleLamarClick} type="primary">
                              <span className="me-2 text-lg">
                                <MdOutlineFileUpload />
                              </span>
                              Lamar
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="self-center">
                            <Avatar src={ListLowongan[0].ava} />
                          </div>
                          <div>
                            <h6 className="font-semibold">{item.user?.name}</h6>
                            <h6 className="text-grey-200">{item.user?.role}</h6>
                          </div>
                        </>
                      )}
                    </Flex>
                  </Card>
                </Link>
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
