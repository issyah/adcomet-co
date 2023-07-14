import AuthLayout from "../../src/layout/AuthLayout";
import { Box, Button, Card, Typography } from "@mui/material";
import CampaignTable from "../../src/CampaignTable";
import { AddCircle } from "@mui/icons-material";
import Link from "next/link";
export default function Campaigns(props) {
  return (
    <AuthLayout>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" fontWeight="900">
          Campaigns
        </Typography>
        <Button component={Link} href='/campaigns/create-campaign' variant="contained" startIcon={<AddCircle/>}>Create new campaigns</Button>
      </Box>
      <Card sx={{ mt: 4 }}>
        <CampaignTable />
      </Card>
    </AuthLayout>
  );
}
