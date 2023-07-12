import AuthLayout from "../src/layout/AuthLayout";
import { Card, Typography } from "@mui/material";
import CampaignTable from "../src/CampaignTable";
export default function Campaigns(props) {
  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight="900">
        Campaigns
      </Typography>
      <Card sx={{ mt: 4 }}>
        <CampaignTable />
      </Card>
    </AuthLayout>
  );
}
