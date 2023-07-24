/**
 * The main private dashboard for advertisers
 **/
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import { useRouter } from "next/router";
import {
  formatNumber,
  formatNumberCompact,
  setStatusColor,
} from "../src/common";
import Link from "next/link";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DataGrid from "../src/DataGrid";
import CampaignTable from "../src/CampaignTable";
import { useEffect } from "react";
import { useContextProvider } from "../context/ContextProvider";
export default function Dashboard() {
  const router = useRouter();
  const {setLoading} = useContextProvider();
  const data = [
    {
      label: "Total Campaigns",
      // href: "/campaigns",
      value: formatNumberCompact(15),
      icon: <ContentPasteOutlinedIcon color="primary" />,
    },
    {
      label: "Active Campaigns",
      value: formatNumberCompact(10),
      icon: <AssignmentTurnedInOutlinedIcon color="success" />,
    },
    {
      label: "Pending Campaigns",
      value: formatNumberCompact(5),
      icon: <PendingActionsOutlinedIcon color="info" />,
    },
    {
      label: "Total Spending",
      // href: "/campaigns",
      value: formatNumberCompact(15000),
      prefix: "$",
      icon: <AttachMoneyOutlinedIcon color="success" />,
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

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Box>
      <Typography variant="h3" fontWeight="900">
        Overview
      </Typography>
      <Box mt={4}>
        {data && (
          <Grid container spacing={4}>
            {data?.map((item, index) => (
              <Grid item md={3} xs={12} key={index}>
                <Card sx={item?.sx ? item?.sx : undefined}>
                  <CardContent sx={{
                    overflow:'hidden'
                  }}>
                    <Box
                      display="flex"
                      sx={{
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      {item?.icon && item.icon}
                      <Box>
                        <Box >
                          <Typography
                            variant="body1"
                            color="grey.900"
                            gutterBottom
                            sx={{
                              overflow:'hidden',
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item?.label}
                          </Typography>
                        </Box>

                        <Typography variant="h4" fontWeight="500">
                          {item?.prefix && (
                            <Typography sx={{ display: "inline" }}>
                              {item?.prefix}
                            </Typography>
                          )}
                          {item?.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box textAlign={"right"} mt={2}></Box>
      <Box mt={4}>
        <Box mb={2} display="flex" justifyContent="space-between">
          <Typography variant="h5" gutterBottom>
            Most Recent Campaigns
          </Typography>
          <Button
            component={Link}
            href="/campaigns"
            endIcon={<KeyboardArrowRightOutlined />}
          >
            View all campaigns
          </Button>
        </Box>
        <Card>
          <CampaignTable />
        </Card>
      </Box>
    </Box>
  );
}

Dashboard.getLayout = (page) =>  (
  <AuthLayout>{page}</AuthLayout>
)
