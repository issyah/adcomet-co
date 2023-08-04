/**
 * The main campaign creation page*/
import { useState } from "react";
import CampaignInformation from "@/src/CampaignInformation";
import AuthLayout from "@/src/layout/AuthLayout";
import { Box, Grid, InputAdornment, MenuItem, Tooltip } from "@mui/material";
import CreateCampaignProgress from "@/src/CreateCampaignProgress";
import CampaignLocation from "@/src/CampaignLocation";
import { Controller, useForm } from "react-hook-form";
import { regexFullDomainPath } from "@/src/common";
import { HelpOutlineOutlined } from "@mui/icons-material";
import Industry from "@/src/json/industry.json";
export default function CampaignCreator(props) {
  const [tab, setTab] = useState("campaign-information");
  const handleSwitchTab = (id) => {
    if (tab === id) return;
    setTab(id);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      link: "",
      industry: "",
      useCompanyIndustry: true,
      tags: [],
    },
  });

  const formCampaignInformation = [
    {
      id: "name",
      Controller: {
        name: "name",
        rules: {
          required: "Please fill in a campaign name",
        },
      },
      Field: {
        label: "Campaign name",
      },
    },
    {
      id: "link",
      Controller: {
        name: "link",
        rules: {
          required: "Please add in the campaign link.",
          pattern: {
            value: regexFullDomainPath(),
            message: "Please add in a valid domain link",
          },
        },
      },
      Field: {
        label: "Campaign link",
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="This will be the url/link user visits when clicking on your campaign">
                <HelpOutlineOutlined />
              </Tooltip>
            </InputAdornment>
          ),
        },
      },
    },
    {
      id: "industry",
      Controller: {
        name: "industry",
        rules: {
          required: "Please select one option",
        },
      },
      Field: {
        label: "Campaign industry",
      },
      // top heirachy formControl
      FormControl: {
        disabled: watch("useCompanyIndustry"),
      },
      type: "select",
      options: () =>
        Industry.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.label}
          </MenuItem>
        )),
    },
    {
      id: "useCompanyIndustry",
      Controller: {
        name: "useCompanyIndustry",
        defaultValue: true,
      },
      Field: {
        label: "Use my company's industry",
      },
      type: "checkbox",
    },
  ];

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
              color: tab == "campaign-information" && "primary.main",
              onClick: () => handleSwitchTab("campaign-information"),
            },
            {
              type: "text",
              label: "Select Location",
              color: tab == "campaign-location" && "primary.main",
              onClick: () => handleSwitchTab("campaign-location"),
            },
            {
              type: "text",
              label: "Upload your creatives",
              color: tab === "campaign-creatives" && "primary.main",
              onClick: () => handleSwitchTab("campaign-creative"),
            },
            {
              type: "text",
              label: "Review",
              color: tab === "campaign-review" && "primary.main",
              onClick: () => handleSwitchTab("campaign-review"),
            },
          ]}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item md={7}>
          {tab == "campaign-information" && (
            <CampaignInformation
              formFields={formCampaignInformation}
              control={control}
              handleSubmit={handleSubmit}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
            />
          )}
          {tab == "campaign-location" && <CampaignLocation />}
        </Grid>
      </Grid>
    </Box>
  );
}

CampaignCreator.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
