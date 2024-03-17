import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/app";
import { useEffect } from "react";
import axios from "../../utils/axios";

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All"); // Active category: All, Active, Suspended
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  // Function to filter users based on the active category
  const filteredUsers = () => {
    if (activeCategory === "Active") {
      return users.filter((user) => user.status === "Online");
    } else if (activeCategory === "Suspended") {
      return users.filter((user) => !user.verified);
    } else {
      return users;
    }
  };

  const boxStyles = {
    width: "calc(33.33% - 16px)",
    margin: "8px",
    padding: "16px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
  };

  const handleBoxClick = (category) => {
    setActiveCategory(category);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleVerificationChange = async (userId, event) => {
    const newStatus = event.target.value === "Verified" ? true : false;

    try {
      const response = await axios.post("/user/updateVerification", {
        userId: userId,
        newStatus: newStatus,
      });

      if (response.status === 200) {
        // Handle successful response from the server
        console.log("User status updated successfully");
      } else {
        // Handle error responses
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error occurred while updating user status:", error);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          sx={{
            ...boxStyles,
            backgroundColor: activeCategory === "All" ? "red" : "blue",
          }}
          onClick={() => handleBoxClick("All")}
        >
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h5">{users.length}</Typography>
        </Paper>
        <Paper
          sx={{
            ...boxStyles,
            backgroundColor: activeCategory === "Active" ? "red" : "blue",
          }}
          onClick={() => handleBoxClick("Active")}
        >
          <Typography variant="h6">Active Users</Typography>
          <Typography variant="h5">
            {users.filter((user) => user.status === "Online").length}
          </Typography>
        </Paper>
        <Paper
          sx={{
            ...boxStyles,
            backgroundColor: activeCategory === "Suspended" ? "red" : "blue",
          }}
          onClick={() => handleBoxClick("Suspended")}
        >
          <Typography variant="h6">Suspended Users</Typography>
          <Typography variant="h5">
            {users.filter((user) => !user.verified).length}
          </Typography>
        </Paper>
      </Box>

      {/* Table to display user information */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers().map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <FormControl>
                    <Select
                      value={user.verified ? "Verified" : "Unverified"}
                      onChange={(event) =>
                        handleVerificationChange(user._id, event)
                      }
                    >
                      <MenuItem value="Verified">Verified</MenuItem>
                      <MenuItem value="Unverified">Unverified</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to suspend the user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleVerificationChange("suspend")}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
