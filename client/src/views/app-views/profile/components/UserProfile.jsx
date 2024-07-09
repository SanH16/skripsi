import { Button, Card, ConfigProvider, Flex, Image, Spin } from "antd";
import { BiSolidErrorCircle } from "react-icons/bi";

import anonymousPict from "@/assets/anonymous profile.jpg";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { APIpegawai } from "@/apis/APIpegawai";

export default function UserProfile() {
  const stateDataUser = useSelector(selectGetUserLogin);
  const dataUser = stateDataUser?.data;

  const {
    data: pegawaiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pegawaiData"],
    queryFn: async () => {
      const result = await APIpegawai.getDataPegawai();
      return result;
    },
  });
  // const pegawaiData = data;

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const stats = pegawaiData?.[0]?.status_bekerja;

  return (
    <>
      <Card>
        <div className="flex justify-between">
          <h3>Profil</h3>
          {dataUser?.role === "admin" ? (
            <>
              <div>
                <Link to={"/add-user"}>
                  <Button className="me-3 border-green-500 text-green-500 hover:bg-green-700 hover:text-white">
                    Add New Account
                  </Button>
                </Link>
                <Link
                  to={
                    pegawaiData && pegawaiData.length > 0
                      ? `/update-pegawai/${pegawaiData?.[0]?.uuid}`
                      : "/add-pegawai"
                  }
                >
                  <Button className="border-green-500 text-green-500 hover:bg-green-700 hover:text-white">
                    {pegawaiData && pegawaiData.length > 0
                      ? "Ubah Data"
                      : "Tambah Data"}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Link
              to={
                pegawaiData && pegawaiData.length > 0
                  ? `/update-pegawai/${pegawaiData?.[0]?.uuid}`
                  : "/add-pegawai"
              }
            >
              <Button className="block border-green-500 text-green-500 hover:bg-green-700 hover:text-white">
                {pegawaiData && pegawaiData.length > 0
                  ? "Ubah Data"
                  : "Tambah Data"}
              </Button>
            </Link>
          )}
        </div>
        {stateDataUser?.status === "success" && (
          <div className="my-4 items-center space-y-4 md:grid md:grid-cols-2 lg:grid-cols-12">
            <div className="flex justify-center md:col-span-1 lg:col-span-3 xl:col-span-2">
              <div id="doctor-image">
                <Image
                  src={`http://localhost:5000/images/${pegawaiData?.[0]?.photo}`}
                  alt="profile-doctor"
                  fallback={anonymousPict}
                  preview={true}
                  className="my-5 h-32 w-32 rounded-full md:my-0 md:h-36 md:w-36"
                />
              </div>
            </div>
            <div className="flex justify-start md:col-span-1 lg:col-span-4 lg:justify-center xl:col-span-3">
              <div id="doctor-information" className="flex flex-col">
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  {dataUser?.name}
                  <span
                    className={
                      stats === "active"
                        ? "m-2 rounded-lg border border-positive p-[3px] text-xs text-positive"
                        : stats === "cuti"
                          ? "m-2 rounded-lg border border-warning p-[3px] text-xs text-warning"
                          : stats === "stop"
                            ? "m-2 rounded-lg border border-negative p-[3px] text-xs text-negative"
                            : stats === "move"
                              ? "m-2 rounded-lg border border-link p-[3px] text-xs text-link"
                              : null
                    }
                  >
                    {stats === "active"
                      ? "aktif"
                      : stats === "cuti"
                        ? "sedang cuti"
                        : stats === "stop"
                          ? "berhenti"
                          : stats === "move"
                            ? "pindah"
                            : stats}
                  </span>
                </p>
                <p className="mt-1 text-sm font-medium text-grey-300 md:text-base">
                  Jabatan ({pegawaiData?.[0]?.jabatan || "unavailable"})
                </p>
                <p className="mt-2">10 tahun pengalaman</p>
              </div>
            </div>
            <div className="me-5 md:col-span-1 lg:col-span-7 xl:col-span-4">
              <div
                id="user-address"
                className="xl:flex xl:w-[100%] xl:space-x-3"
              >
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  Role
                </p>
                <p className="text-sm md:text-base">{dataUser?.role}</p>
              </div>
              <div
                id="user-role"
                className="pb-5 xl:flex xl:w-[100%] xl:space-x-3"
              >
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  Address
                </p>
                <p className="text-sm md:text-base">
                  {pegawaiData?.[0]?.address || "unavailable"}
                </p>
              </div>

              <div id="user-role" className="xl:flex xl:w-[100%] xl:space-x-3">
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  Pendidikan
                </p>
                <p className="text-sm md:text-base">
                  {pegawaiData?.[0]?.pendidikan || "unavailable"}
                </p>
              </div>
              <div id="user-role" className="xl:flex xl:w-[100%] xl:space-x-3">
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  Tanggal Lahir
                </p>
                <p className="text-sm md:text-base">
                  {pegawaiData && pegawaiData[0]?.tanggal_lahir
                    ? moment(pegawaiData[0].tanggal_lahir).format(
                        "DD MMMM YYYY",
                      )
                    : "unavailable"}
                </p>
              </div>
            </div>
            <div className="flex md:col-span-1 lg:col-span-5 xl:col-span-3">
              <div id="doctor-contacts" className="flex space-x-3 text-left">
                <div className="flex-col">
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    Email
                  </p>
                  <p className="mb-3 text-sm font-semibold text-grey-900 md:text-base">
                    Phone
                  </p>
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    NIK
                  </p>
                </div>
                <div className="flex-col">
                  <p className="text-sm md:text-base">{dataUser?.email}</p>
                  <p className="mb-3 text-sm md:text-base">
                    {pegawaiData?.[0]?.phone || "unavailable"}
                  </p>
                  <p className="text-sm md:text-base">
                    {pegawaiData?.[0]?.status_menikah || "unavailable"}
                  </p>
                  <p className="text-sm md:text-base">
                    {pegawaiData?.[0]?.gender || "unavailable"}
                  </p>
                  <p className="text-sm md:text-base">
                    {pegawaiData?.[0]?.nik || "unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {stateDataUser?.status === "loading" || isLoading ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#17c6a3",
              },
            }}
          >
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          </ConfigProvider>
        ) : null}

        {stateDataUser?.status === "failed" && (
          <Flex className="flex-col text-center" gap={2}>
            <BiSolidErrorCircle className="mx-auto text-5xl" />
            <h5>Gagal mengambil data!</h5>
            <p>Terjadi kesalahan!</p>
            <p>{stateDataUser.message}</p>
          </Flex>
        )}
      </Card>
    </>
  );
}
