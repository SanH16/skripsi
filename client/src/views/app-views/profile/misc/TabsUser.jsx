import { Card } from "antd";
import { TabsUserProfile } from "@/components/shared-components/Tabs";

import { WorkExperience } from "./WorkExperience";
import { Education } from "./Education";
import { Certificate } from "./Certificate";
import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export function TabsUser() {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "user"; // Check direktur
  return (
    <section id="tabs-profile">
      {verifRole && (
        <Card>
          <TabsUserProfile
            title={["Pengalaman Kerja", "Pendidikan", "Sertifikat"]}
          >
            <WorkExperience />
            <Education />
            <Certificate />
          </TabsUserProfile>
        </Card>
      )}
    </section>
  );
}
