import { Button, Card, Flex, Skeleton } from "antd";
import { BiSolidErrorCircle } from "react-icons/bi";

import anonymousPict from "@/assets/anonymous profile.jpg";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const stateDataUser = useSelector(selectGetUserLogin);
  const dataUser = stateDataUser?.data;

  return (
    <>
      <Card>
        <div className="flex justify-between">
          <h3>Profil</h3>
          {dataUser?.role === "admin" && (
            <Button className="block border-green-500 text-green-500 hover:bg-green-700 hover:text-white">
              Add New
            </Button>
          )}
        </div>
        {stateDataUser?.status === "success" && (
          <div className="my-4 items-center space-y-4 md:grid md:grid-cols-2 lg:grid-cols-12">
            <div className="flex justify-center md:col-span-1 lg:col-span-3 xl:col-span-2">
              <div id="doctor-image">
                <img
                  src={anonymousPict}
                  alt="profile-doctor"
                  className="my-5 h-32 w-32 rounded-full md:my-0 md:h-36 md:w-36"
                />
              </div>
            </div>
            <div className="flex justify-start md:col-span-1 lg:col-span-4 lg:justify-center xl:col-span-3">
              <div id="doctor-information" className="flex flex-col">
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  {dataUser?.name}
                </p>
                <p className="text-sm font-medium text-grey-300 md:text-base">
                  Jabatan (divisi)
                </p>
                <p className="mt-2">10 tahun pengalaman</p>
              </div>
            </div>
            <div className="me-5 md:col-span-1 lg:col-span-7 xl:col-span-4">
              <div
                id="doctor-address"
                className="xl:flex xl:w-[100%] xl:space-x-3"
              >
                <p className="text-sm font-semibold text-grey-900 md:text-base">
                  Role
                </p>
                <p className="text-sm md:text-base">{dataUser?.role}</p>
              </div>
            </div>
            <div className="flex md:col-span-1 lg:col-span-5 xl:col-span-3">
              <div id="doctor-contacts" className="flex space-x-3 text-left">
                <div className="flex-col">
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-grey-900 md:text-base">
                    Phone
                  </p>
                </div>
                <div className="flex-col">
                  <p className="text-sm md:text-base">{dataUser?.email}</p>
                  <p className="text-sm md:text-base">phone</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {stateDataUser?.status === "loading" && (
          <div>
            <div className="items-center space-y-4 md:grid md:grid-cols-2 lg:grid-cols-12">
              <div className="flex justify-center md:col-span-1 lg:col-span-3 xl:col-span-2">
                <div id="doctor-image">
                  <Skeleton.Avatar
                    active
                    className="h-32 w-32 animate-pulse"
                    size={140}
                  />
                </div>
              </div>
              <div className="flex justify-start md:col-span-1 lg:col-span-4 lg:justify-center xl:col-span-3">
                <div id="doctor-information" className="flex flex-col">
                  <Skeleton className="h-5 w-48" active />
                </div>
              </div>
              <div className="me-5 md:col-span-1 lg:col-span-7 xl:col-span-4">
                <div
                  id="doctor-address"
                  className="xl:flex xl:w-[100%] xl:space-x-3"
                >
                  <Skeleton className="mt-5 h-5 w-full" active />
                </div>
              </div>
              <div className="flex md:col-span-1 lg:col-span-5 xl:col-span-3">
                <div id="doctor-contacts" className="flex space-x-3 text-left">
                  <div className="flex flex-col gap-2">
                    <div>
                      <Skeleton.Button className="h-5 w-10" active />
                    </div>
                    <div>
                      <Skeleton.Button className="h-5 w-10" active />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ps-5">
                    <div>
                      <Skeleton.Input className="h-5 w-10" active />
                    </div>
                    <div>
                      <Skeleton.Input className="h-5 w-10" active />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
