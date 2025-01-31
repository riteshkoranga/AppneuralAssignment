import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import GridContainer from "../components/GridContainer";

const API_URL = "http://localhost:5000/tasks"; // Update with your backend URL

const Controller = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      console.log("Fetched tasks:", response.data); // Debugging log
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (newTask) => {
    await axios.post(API_URL, newTask);
    console.log(newTask.data);
    fetchTasks(); // Reload tasks after adding a new one
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      fetchTasks(); // Reload tasks after deletion
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    await axios.put(`${API_URL}/${taskId}`, updatedTask);
    fetchTasks(); // Reload tasks after updating
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <GridContainer>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </GridContainer>
  );
};

export default Controller;
