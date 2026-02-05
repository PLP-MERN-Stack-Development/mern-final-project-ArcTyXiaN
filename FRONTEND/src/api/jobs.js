import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

// ----------------- AUTH -----------------
export const registerUser = async (user) => {
  const res = await axios.post(`${API_URL}/auth/register`, user);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  return res.data;
};

// ----------------- JOBS -----------------

// Get all jobs
export const getJobs = async () => {
  const res = await axios.get(`${API_URL}/jobs`);
  return res.data;
};

// Get a single job by ID
export const getJobById = async (id) => {
  const res = await axios.get(`${API_URL}/jobs/${id}`);
  return res.data;
};

// Create a new job (Employer only)
export const postJob = async (job, token) => {
  const res = await axios.post(`${API_URL}/jobs`, job, {
    headers: { Authorization: token },
  });
  return res.data;
};

// Update an existing job (Employer only, owner)
export const updateJob = async (id, job, token) => {
  const res = await axios.put(`${API_URL}/jobs/${id}`, job, {
    headers: { Authorization: token },
  });
  return res.data;
};

// Delete a job (Employer only, owner)
export const deleteJob = async (id, token) => {
  const res = await axios.delete(`${API_URL}/jobs/${id}`, {
    headers: { Authorization: token },
  });
  return res.data;
};
