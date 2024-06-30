import { Card } from "antd";

import anonymousPict from "@/assets/anonymous profile.jpg";

export default function UserProfile() {
  return (
    <>
      <Card>
        <h3>Profil</h3>
        {/* {data.map((item) => ( */}
        {/* {stateDataUser?.status === "success" && ( */}
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
                Name
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
              <p className="text-sm md:text-base">admin</p>
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
                <p className="text-sm md:text-base">email</p>
                <p className="text-sm md:text-base">phone</p>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* )} */}

        {/* {stateDataUser?.status === "failed" && (
          <Flex className="flex-col text-center" gap={2}>
            <BiSolidErrorCircle className="mx-auto text-5xl" />
            <h5>Gagal mengambil data!</h5>
            <p>Terjadi kesalahan!</p>
            <p>{stateDataUser.message}</p>
          </Flex>
        )} */}
      </Card>
    </>
  );
}
