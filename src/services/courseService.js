import api from "./api";

export async function getCourses() {
  const res = await api.get("/courses");
  return res.data;
}

export async function createCourse(data) {
  const res = await api.post("/courses", data);
  return res.data;
}

export async function loginUser(email, password) {
  const res = await api.post("/auth/login", { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
}

export async function registerUser(data) {
  const res = await api.post("/auth/register", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
}

export async function logoutUser() {
  localStorage.removeItem("token");
}