import axios from "axios";

const BASE_URL = "https://localhost:7071/api"; // Replace with your actual API base URL

export const addUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/Task/AddUser`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const getAllTask = async (data) => {
  try {
    const response = await axios.get(`${BASE_URL}/Task/GetAllTasks`);
    return response.data;
  } catch (error) {
    console.error("Error getting Task:", error);
    throw error;
  }
};
export const updateTask = async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/Task/UpdateTask/${data.taskId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error adding status:", error);
      throw error;
    }
  };
  export const addTask = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/Task/AddTask`, data);
      return response.data;
    } catch (error) {
      console.error("Error adding Task:", error);
      throw error;
    }
  };
  export const deleteTask = async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/Task/DeleteTask/${data.taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error adding status:", error);
      throw error;
    }
  };
  export const login = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/Task/Login`, data);
      return response.data;
    } catch (error) {
      console.error("login failed:", error);
      throw error;
    }
  };