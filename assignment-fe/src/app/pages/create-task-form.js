import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Stack,
  Typography,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TYTextField } from "src/components/ui/ty-textfield";
import { userApi } from "@/api/user";  
import { tasksApi } from "@/api/task";  

export const TaskForm = ({ mutate }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch users for the assignee dropdown
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const fetchedUsers = await userApi.getAllUsers(); 
      setUsers(fetchedUsers || []);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form initial values
  const initialValues = {
    title: "",
    description: "",
    assignedUser: "", 
    status: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().min(3).max(80).required("Title is required"),
    description: Yup.string().min(5).max(200).required("Description is required"),
    assignedUser: Yup.string().required("Assignee is required"),
    status: Yup.string().required("Status is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const reqBody = {
          title: values.title,
          description: values.description,
          assignedUser: values.assignedUser, 
          status: values.status,
        };

        // API call to create task
        await tasksApi.createTask(reqBody);
        toast.success("Task created successfully");
        formik.resetForm();  
        mutate();  
      } catch (error) {
        console.error(error);
        toast.error(error.message || "An error occurred");
      }
    },
  });

  return (
    <Card sx={{ p: 2, mt: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
          <Typography variant="h6">Add New Task</Typography>
        </Stack>

        <Stack spacing={2} sx={{ pt: 1 }}>
          <TYTextField formik={formik} name="title" label="Title" required />

          <TYTextField
            formik={formik}
            name="description"
            label="Description"
            required
            multiline
            rows={4}
          />

        
          <FormControl fullWidth required>
            <InputLabel>Assignee</InputLabel>
            <Select
              label="Assignee"
              name="assignedUser"
              value={formik.values.assignedUser}
              onChange={formik.handleChange}
              error={formik.touched.assignedUser && Boolean(formik.errors.assignedUser)}
            >
              {loadingUsers ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name} 
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TYTextField formik={formik} name="status" label="Status" required />

          <Grid container sx={{ justifyContent: "flex-end", marginTop: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={formik.isSubmitting}
              fullWidth
            >
              Add Task
            </LoadingButton>
          </Grid>
        </Stack>
      </form>
    </Card>
  );
};
