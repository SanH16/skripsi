import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { splitString } from "@/utils/SplitString";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Image,
  List,
  Modal,
  Skeleton,
  Space,
  Tag,
} from "antd";

import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import parse from "html-react-parser";

dayjs.extend(relativeTime);
dayjs.locale("id");

import { UserOutlined } from "@ant-design/icons";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { ListLowongan as dataConstant } from "../constant/list-lowongan";
import { ModalDeleteRekrutmen } from "@/components/shared-components/ModalDeleteRekrutmen";

import { authService } from "@/configs/auth";
import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useQuery } from "@tanstack/react-query";
import AddLamaran from "./AddLamaran";

export default function DetailLowongan() {
  const isAuthenticated = authService.isAuthorized();
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const { rekrutmenId } = useParams();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useDocumentTitle("Detail Lowongan");
  useScrollToTop();

  const handleOpenModalDelete = () => {
    setIsShowDelete((prev) => !prev);
  };

  const handleLamarClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rekrutmenData", rekrutmenId],
    queryFn: async () => {
      const result = await APIrekrutmen.getRekrutmenById(rekrutmenId);
      return result;
    },
  });

  const detailRekrutmen = data || [];
  const tags = splitString(detailRekrutmen?.tags);

  return (
    <>
      <section id="detail-lowongan" className="py-5">
        {isAuthenticated ? (
          <Flex justify="space-between" className="mb-6">
            <Link to="/rekrutmen">
              <Button
                id="button-back"
                icon={
                  <IoArrowBackOutline className="text-[20px] md:text-[24px]" />
                }
                className="flex w-[100px] justify-center border-transparent bg-transparent text-center text-sm font-semibold text-[#4B4B4B] shadow-none hover:text-green-500 md:text-base"
              >
                Kembali
              </Button>
            </Link>
            {verifRole && (
              <Flex justify="space-around" align="center">
                <section className="me-5">
                  <Space size="middle">
                    <Button
                      onClick={handleOpenModalDelete}
                      id="remove-lowongan"
                      className="flex border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <span className="me-2 text-lg">
                        <FaTrashAlt />
                      </span>
                      Hapus
                    </Button>
                  </Space>
                </section>

                <section>
                  <Space size="middle">
                    <Link to={`/update-lowongan/${rekrutmenId}`}>
                      <Button
                        id="update-lowongan"
                        className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      >
                        <span className="me-2 text-lg">
                          <FaTrashAlt />
                        </span>
                        Update
                      </Button>
                    </Link>
                  </Space>
                </section>
              </Flex>
            )}
          </Flex>
        ) : (
          <Flex justify="space-between" className="mx-20 mb-6">
            <Link to="/">
              <Button
                id="button-back"
                icon={
                  <IoArrowBackOutline className="text-[20px] md:text-[24px]" />
                }
                className="flex w-[100px] justify-center border-transparent bg-transparent text-center text-sm font-semibold text-[#4B4B4B] shadow-none hover:text-green-500 md:text-base"
              >
                Kembali
              </Button>
            </Link>
            <Flex justify="space-around" align="center">
              <section>
                <Space size="middle">
                  <Button
                    onClick={handleLamarClick}
                    className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <span className="me-2 text-lg">
                      <MdOutlineFileUpload />
                    </span>
                    Lamar
                  </Button>
                </Space>
              </section>
            </Flex>
          </Flex>
        )}

        <Card className={!isAuthenticated && "mx-20"}>
          <>
            {isLoading ? (
              <>
                <Skeleton.Input
                  active
                  className="mb-3 mt-5 block h-[15px] w-[350px] sm:w-[500px]"
                />
                <Space>
                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Skeleton.Avatar active size={60} shape="circle" />
                        }
                        title={
                          <Skeleton.Input
                            active
                            size="small"
                            className="h-[15px] w-[200px] sm:w-[300px]"
                          />
                        }
                        description={
                          <Skeleton.Input
                            active
                            size="small"
                            className="h-[15px] w-[200px] sm:w-[300px]"
                          />
                        }
                      />
                    </List.Item>
                  </List>
                </Space>
                <Skeleton.Input
                  active
                  className="mb-3 mt-5 block h-[15px] w-[100px] sm:w-[200px]"
                />
              </>
            ) : (
              <>
                <section className="mb-3 mt-5">
                  <h2 className="sm:text-md text-start text-base font-semibold text-[#0D0D0D] md:text-lg lg:text-xl xl:text-3xl">
                    {detailRekrutmen?.title}
                  </h2>
                </section>

                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size={60}
                          icon={<UserOutlined />}
                          src={dataConstant[2].image}
                        />
                      }
                      title={
                        <h5 className="text-sm font-semibold text-grey-500 sm:text-base">
                          Oleh {detailRekrutmen?.user?.name}
                        </h5>
                      }
                      description={
                        <p className="text-xs text-grey-400 sm:text-sm">
                          Diunggah pada{" "}
                          {dayjs(
                            detailRekrutmen?.createdAt,
                            "YYYY-MM-DDTHH:mm:ssZ",
                          ).format(`DD MMMM YYYY [pukul] HH:mm [WIB]`)}
                        </p>
                      }
                    />
                  </List.Item>
                </List>
              </>
            )}

            {isLoading ? (
              <>
                <Skeleton.Image
                  active
                  className="h-[250px] w-full sm:h-[300px] md:h-[380px] md:w-3/4 lg:h-[403px] xl:h-[433px]"
                />
              </>
            ) : (
              <Image
                id="image-lowongan"
                className="h-[250px] max-w-[800px] sm:h-[300px] md:h-[380px] lg:h-[403px] xl:h-[433px]"
                // src={dataConstant[1].image}
                src={`http://localhost:5000/images/${detailRekrutmen?.image_rekrutmen}`}
                alt={detailRekrutmen?.image_desc}
                fallback={dataConstant[1].image}
                preview={true}
              />
            )}

            {isLoading ? (
              <>
                <Skeleton.Input
                  active
                  className="mb-3 mt-5 block h-[15px] w-[250px]"
                />
                <Skeleton.Input
                  active
                  className="mb-3 mt-5 block h-[45px] w-[50px] rounded-2xl"
                />
                <Skeleton.Input
                  active
                  className="mb-3 mt-5 block h-[15px] w-[250px]"
                />
              </>
            ) : (
              <>
                <section id="tags">
                  <h4 className="my-4 text-base text-[#4B4B4B] sm:text-xl">
                    Kategori
                  </h4>
                  {tags &&
                    tags?.map((tag, index) => (
                      <Tag
                        key={index}
                        className="mb-2 me-2 text-justify text-xs font-semibold capitalize text-[#4B4B4B] hover:bg-green-100 sm:text-sm md:text-base"
                        rootClassName="h-7 sm:h-10 px-5 py-2.5 rounded-lg border-[#4B4B4B] justify-center items-center inline-flex"
                      >
                        {tag}
                      </Tag>
                    ))}
                </section>

                <section
                  id="content-lowongan"
                  className="menu my-5 w-full text-justify"
                >
                  {parse(`${detailRekrutmen?.text_desc}`)}

                  <div className="mt-5">
                    <h5 className="mb-2 text-xs font-semibold text-[#151515] sm:text-base">
                      Referensi
                    </h5>
                    <p className="text-start text-[10px] font-[300] italic text-[#151515] sm:text-sm">
                      {detailRekrutmen?.reference}
                    </p>
                  </div>
                </section>
              </>
            )}
          </>
        </Card>
        {isError && (
          <Flex className="mb-5 flex-col items-center justify-center text-red-500">
            <p>{isError.message}</p>
          </Flex>
        )}
        {isShowDelete && (
          <ModalDeleteRekrutmen
            closeModal={handleOpenModalDelete}
            detailRekrutmen={detailRekrutmen}
          />
        )}
        <Modal
          title="Upload Lamaran"
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={900}
        >
          <AddLamaran onClose={handleCloseModal} />
        </Modal>
      </section>
    </>
  );
}
