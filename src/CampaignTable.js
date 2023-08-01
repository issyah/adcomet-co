/**
 * The main campaign table used in Home and Campaigns page*/

import { Chip, Button, Box } from "@mui/material";
import DataGrid from "./DataGrid";
import { setStatusColor, formatNumber } from "./common";
import { useRouter } from "next/router";
export default function CampaignTable() {
  const router = useRouter();
  const header = [
    {
      label: "ID",
      id: "id",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Status",
      id: "status",
      render: (status) => (
        <Chip
          label={status}
          color={setStatusColor(status)}
          variant="contained"
          size="small"
          sx={{ textTransform: "Capitalize" }}
        />
      ),
    },
    {
      label: "Amount spent",
      id: "price",
      render: (price) => (isNaN(price) ? price : `$${formatNumber(price)}`),
    },
    {
      label: "Location",
      id: "location",
    },
    {
      label: "",
      id: "id",
      render: (id) => (
        <Button size="small" onClick={() => router.push(`/ad/campaigns/${id}`)}>
          View
        </Button>
      ),
    },
  ];

  const tableData = [
    {
      id: "1",
      name: "Nike Air Jordan Launch.",
      status: "pending",
      price: 500,
      location: "Digital billboard Level 1 - Suntec",
    },
    {
      id: 2,
      name: "Campaign test 2",
      status: "approved",
      price: 1000,
      location: "Changi Airport Jewel level 1",
    },
  ];
  return (
    <Box sx={{overflowX: 'auto',}}>
      <Box sx={{
        width:'100%',
        display:"table",
        tableLayout: 'fixed'
      }}>
        <DataGrid data={tableData} header={header} />
      </Box>
    </Box>
  );
}
