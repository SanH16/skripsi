import { BsSearch } from "react-icons/bs";

import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Image,
  Modal,
  Pagination,
  Row,
  Skeleton,
  Tag,
} from "antd";
import { MdOutlineFileUpload } from "react-icons/md";

import { ListLowongan as dataConstant } from "@/views/app-views/rekrutmen/constant/list-lowongan";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { splitString } from "@/utils/SplitString";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { useState } from "react";
import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { Link } from "react-router-dom";

dayjs.locale("id");
import parse from "html-react-parser";

import { authService } from "@/configs/auth";
import { useQuery } from "@tanstack/react-query";
import AddLamaran from "../misc/AddLamaran";

export function ListLowongan() {
  return (
    <>
      <ListingLowongan />
    </>
  );
}

const SearchLowongan = ({ onSearch }) => (
  <section id="search-lowongan">
    <div className="relative mb-6 focus:bg-black">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 sm:ps-8">
        <BsSearch className="text-gray-400" />
      </div>
      <input
        id="search-bar-forum-1"
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm focus:outline-green-500 sm:p-5 sm:ps-14"
        placeholder="Cari kata kunci"
        name="search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  </section>
);

export function ListingLowongan() {
  const isAuthenticated = authService.isAuthorized();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // new state for search query

  const sizePage = 6;

  const path = window.location.pathname;

  useDocumentTitle("List Lowongan");
  useScrollToTop();

  const { data, isLoading } = useQuery({
    queryKey: ["rekrutmenList", currentPage],
    queryFn: async () => {
      const result = await APIrekrutmen.getAllRekrutmens(currentPage);
      return result;
    },
  });

  const dataLowongan = data || [];

  const filteredDataLowongan = dataLowongan.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleLamarClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <SearchLowongan onSearch={setSearchQuery} />
      <section id="list-lowongan">
        <Row gutter={[16, 24]}>
          {filteredDataLowongan
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
                        {isLoading ? (
                          <Skeleton.Image
                            active
                            className="h-[200px] w-full md:w-full"
                          />
                        ) : (
                          <Image
                            alt={item?.image_desc}
                            // src={item?.image_rekrutmen}
                            src={`http://localhost:5000/images/${item?.image_rekrutmen}`}
                            className="h-[200px] md:h-[190px] lg:h-[200px] xl:h-[250px]"
                            preview={false}
                            fallback={dataConstant[0].image}
                          />
                        )}
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
                            <Avatar src={dataConstant[0].ava} />
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

        <Modal
          title="Upload Lamaran"
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={900}
        >
          <AddLamaran onClose={handleCloseModal} />
        </Modal>
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
