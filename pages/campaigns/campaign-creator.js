/**
 * The main campaign creation page*/
import { useState } from "react";
import CampaignInformation from "../../src/CampaignInformation";
import AuthLayout from "../../src/layout/AuthLayout";
import { Box, Grid } from "@mui/material";
import CreateCampaignProgress from "../../src/CreateCampaignProgress";
import CampaignLocation from "../../src/CampaignLocation";
export default function CampaignCreator(props) {
  const [tab, setTab] = useState("campaign-information");
  const handleSwitchTab = (id) => {
    if (tab === id) return;
    setTab(id);
  };
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
  });
  return (
    <Box>
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
      <Grid container spacing={2}>
        <Grid item md={7}>
          {tab == "campaign-information" && (
            <CampaignInformation
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {tab == "campaign-location" && <CampaignLocation />}
        </Grid>
      </Grid>
    </Box>
  );
}

CampaignCreator.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
