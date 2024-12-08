'use client'

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,                                                                                                                       
} from "@mui/material";                     
import { tasksApi } from "@/api/task";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";


const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router=useRouter();

  // Fetch tasks from the API
  const fetchTasks = async (status) => {
    setLoading(true);  
    setError(null);
    try {
      const fetchedTasks = await tasksApi.getAllTasks();
      console.log("feched tasks:",fetchedTasks);
      setTasks(fetchedTasks || []); 
    } catch (err) {
      setError(err.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(statusFilter);
  }, [statusFilter]);

  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

  return (
    <div>
      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          defaultValue=""
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button
          variant="contained"
          color="primary"
       onClick={() => router.push(paths.createTaskForm)}
        >
          Create Task
        </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.assignedUser || "Unassigned"}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      {task.description}
                    </TableCell>
                    <TableCell>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center" }}>
                    No tasks available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TaskTable;
