/**
 * On the users page, we can manage current users that are available that can access the page
 **/
import AuthLayout from "./layout/AuthLayout";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
  Alert,
  Avatar,
} from "@mui/material";
import { useContextProvider } from "../context/ContextProvider";
import { getUsersInCompany } from "./firebase-func";
import { useEffect, useState } from "react";
import DataGrid from "./DataGrid";
import MenuIcon from "@mui/icons-material/Menu";
import { DeleteOutline } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import UserDrawerEditDetail from "./UserDrawerEditDetail";
import AddNewUserDialog from "./AddNewUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
export default function UsersComponent(props) {
  const [users, setUsers] = useState([]);
  const { loading, setLoading, company, setAlert } = useContextProvider();
  // menu dropdown
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const [selectedUser, setSelectedUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const handleMenuAnchor = (e, id) => {
    setAnchorEl(e.currentTarget);
    const user = users?.find((i) => i.id == id);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl();
    setSelectedUser({});
  };

  const handleMenuAction = (type) => {
    setAnchorEl();
    switch (type) {
      case "edit-user":
        setOpenEditUser(true);
        break;
      case "add-user":
        setOpenAddUser(true);
        break;
      case "delete-user":
        setOpenDeleteUser(true);
        break;
      default:
        break;
    }
  };

  const handleFetchUsers = async () => {
    setLoading(true);
    const { result, error } = await getUsersInCompany(company?.id);
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error.message,
      });
      setLoading(false);
      return;
    }
    // success
    if (result) {
      const newData = result?.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          userType: data?.company?.userType,
          created: data?.created?.toDate(),
          lastSeen: data?.lastSeen?.toDate(),
        };
      });
      setUsers(newData);
    }
    setLoading(false);
  };

  const headers = [
    {
      label: "Created on",
      id: "created",
      render: (created) => (
        <Typography variant="caption">
          {moment(created).format("DD MMM YY")}
        </Typography>
      ),
    },
    {
      label: 'Avatar',
      id: 'avatar',
      render: (item) => (
        <Avatar src={item.avatar || undefined} alt={'Avatar'}></Avatar>
      )
    },
    {
      label: "Email",
      id: "email",
    },
    {
      label: "First Name",
      id: "firstName",
    },
    {
      label: "Last Name",
      id: "lastName",
    },
    // {
    //   label: "Address",
    //   id: "address",
    // },
    // {
    //   label: "Postal",
    //   id: "postal",
    // },
    {
      label: 'Designation',
      id: 'designation'
    },
    {
      label: "Last seen",
      id: "lastSeen",
      render: (item) => (
        <Typography variant="caption">{moment(item.lastSeen).fromNow()}</Typography>
      ),
    },
    {
      label: "User type",
      id: "userType",
      render: (item) => (
        <Chip
          label={item.userType}
          color={(item.userType != "user") ? "primary" : "default"}
          variant="contained"
          size="small"
          sx={{
            textTransform: "capitalize",
            width: "100%",
          }}
        />
      ),
    },
    {
      label: "",
      id: "id",
      render: (item) =>
        company?.userType != "user" && (
          <IconButton onClick={(e) => handleMenuAnchor(e, item.id)}>
            <MenuIcon />
          </IconButton>
        ),
    },
  ];

  useEffect(() => {
    if (company?.id) {
      handleFetchUsers();
    }
  }, []);

  useEffect(() => {
    if (company?.id) {
      handleFetchUsers();
    }
  }, [company])

  useEffect(() => {
    if (updateUser?.uid) {
      console.log(updateUser);
      // get the current index of the user
      let tempData = users;
      let index = tempData.findIndex((i) => i.uid == updateUser?.uid);
      if (index != -1) {
        // update the data
        tempData[index] = {
          ...tempData[index],
          ...updateUser,
        };
        setUsers(tempData);
      }
    }
  }, [updateUser]);

  return (
    <Box>
      <UserDrawerEditDetail
        open={openEditUser}
        setOpen={setOpenEditUser}
        selectedUser={selectedUser}
        setUpdateUser={setUpdateUser}
      />
      <AddNewUserDialog
        open={openAddUser}
        setOpen={setOpenAddUser}
        setUsers={setUsers}
        users={users}
      />
      <DeleteUserDialog
        open={openDeleteUser}
        setOpen={setOpenDeleteUser}
        selectedUser={selectedUser}
        setUsers={setUsers}
        users={users}
      />
      <Typography variant="h3" component="h1" fontWeight="900">
        Users
      </Typography>
      <Typography gutterBottom>
        Add new users to allow them access to create new campaigns under your
        company
      </Typography>
      <Box
        sx={{
          mt: 4,
        }}
      >
        {company?.userType == "user" && (
          <Alert severity="info">
            Only admin / user who registered <b>{company?.name}</b> can manage
            users and add new user.
          </Alert>
        )}
        {company?.userType != "user" && (
          <Button
            variant="contained"
            onClick={() => handleMenuAction("add-user")}
          >
            Add new user
          </Button>
        )}
        <Card sx={{ mt: 2 }}>
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{
              width: '100%',
              display: 'table',
              tableLayout: 'fixed'
            }}>
              <DataGrid header={headers} data={users} loading={loading} />

            </Box>
          </Box>
        </Card>
        {/* menu options */}
        {company?.userType !== "user" && (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorPosition={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleMenuAction("edit-user")}>
              Edit user details
            </MenuItem>
            <MenuItem
              sx={{
                color: red[500],
              }}
              onClick={() => handleMenuAction('delete-user')}
            >
              Delete user
            </MenuItem>
          </Menu>
        )}
      </Box>
      {/* fetch current users */}
    </Box>
  );
}
