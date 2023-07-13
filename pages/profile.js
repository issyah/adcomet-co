/**
 * The main profile page for the user */
import {
  Grid,
  TextField,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import { useEffect, useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
export default function Profile(props) {
  const { setLoading } = useContextProvider();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    industry: "",
  });
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/get-profile");
    const result = await res.json();
    if (result) {
      setForm({ ...result });
    }
    setLoading(false);
  };

  const updateForm = (id, value) => {
    setForm({
      ...form,
      [id]: value,
    });
  };

  const formData = [
    {
      label: "First name",
      id: "firstName",
      type: "text",
    },
    {
      label: "Last name",
      id: "lastName",
      type: "text",
    },
    {
      label: "Email",
      id: "email",
      type: 'email'
    },
    {
      label: "Company name",
      id: "company",
      type: "text",
    },
    {
      label: "Industry",
      id: "industry",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight={900} component={"h1"} gutterBottom>
        Profile
      </Typography>
      <Typography>
        Update your profile information and customize your profile settings
      </Typography>
      <Card
        sx={{
          mt: 4,
          width: {
            md: "80%",
            sm: "100%",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box>
            <Stack spacing={4}>
              {formData?.map((item, index) => (
                <TextField
                  key={index}
                  {...item}
                  value={form[item?.id]}
                />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
