import { Card } from "antd";
import { TabsUserProfile } from "@/components/shared-components/Tabs";

import { WorkExperience } from "./WorkExperience";
import { Education } from "./Education";
import { Certificate } from "./Certificate";

export function TabsUser() {
  return (
    <section id="tabs-profile">
      <Card>
        <TabsUserProfile
          title={["Pengalaman Kerja", "Pendidikan", "Sertifikat"]}
        >
          <WorkExperience />
          <Education />
          <Certificate />
        </TabsUserProfile>
      </Card>
    </section>
  );
}
