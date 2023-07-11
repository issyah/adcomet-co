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
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import { useRouter } from "next/router";
import { formatNumber } from "../src/common";
import Link from "next/link";
export default function Dashboard() {
  const router = useRouter();
  const data = [
    {
      label: "Total Campaigns",
      // href: "/campaigns",
      value: formatNumber(15),
    },
    {
      label: "Total Active Campaigns",
      value: formatNumber(10),
    },
    {
      label: "Total Pending Campaigns",
      value: formatNumber(5),
    },
    {
      label: "Total Spending",
      // href: "/campaigns",
      value: formatNumber(15000),
      prefix: "$",
    },
  ];
  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight="900">
        Overview
      </Typography>
      <Box mt={4}>
        {data && (
          <Container maxWidth={"xl"}>
            <Grid container spacing={4}>
              {data?.map((item, index) => (
                <Grid item md={3} xs={12} key={index}>
                  <Card elevation={1}>
                    <CardContent>
                      <Typography variant="body1" color="grey.900" gutterBottom>
                        {item?.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="500">
                        {item?.prefix && <Typography sx={{display:'inline'}}>{item?.prefix}</Typography>}
                        {item?.value}
                      </Typography>
                    </CardContent>
                    {/* <Divider />
                    <CardActions>
                      {item?.href && (
                        <Button
                          component={Link}
                          href={item?.href}
                          endIcon={<KeyboardArrowRightOutlined />}
                        >
                          {"View all"}
                        </Button>
                      )}
                    </CardActions> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Box>
    </AuthLayout>
  );
}
