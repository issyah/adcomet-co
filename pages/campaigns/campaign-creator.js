/**
 * The main campaign creation page*/
import { useState } from "react";
import CampaignInformation from "../../src/CampaignInformation";
import AuthLayout from "../../src/layout/AuthLayout";
import { Box } from "@mui/material";
import CreateCampaignProgress from "../../src/CreateCampaignProgress";
import CampaignLocation from "../../src/CampaignLocation";
export default function CampaignCreator(props) {
  const [tab, setTab] = useState("campaign-information");
  const handleSwitchTab = (id) => {
    if (tab === id) return;
    setTab(id);
  };
  return (
    <AuthLayout>
      <Box mb={2}>
        <CreateCampaignProgress
          list={[
            {
              type: "text",
              label: "Campaign Medium",
            },
            {
              type: "text",
              label: "Campaign Information",
              color: tab == "campaign-information" && "text.primary",
              onClick: () => handleSwitchTab("campaign-information"),
            },
            {
              type: "text",
              label: "Select Location",
              color: tab == "campaign-location" && "text.primary",
              onClick: () => handleSwitchTab("campaign-location"),
            },
            {
              type: "text",
              label: "Upload your creatives",
              color: tab === "campaign-creatives" && "text.priamry",
              onClick: () => handleSwitchTab("campaign-creative"),
            },
            {
              type: "text",
              label: "Review",
              color: tab === "campaign-review" && "text.priamry",
              onClick: () => handleSwitchTab("campaign-review"),
            },
          ]}
        />
      </Box>
      {tab == "campaign-information" && <CampaignInformation />}
      {tab == "campaign-location" && <CampaignLocation />}
    </AuthLayout>
  );
}
