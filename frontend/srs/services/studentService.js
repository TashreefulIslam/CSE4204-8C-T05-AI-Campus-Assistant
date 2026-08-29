import api from "./api";

export const getStudentDashboard = async () => {
  const response = await api.get("/dashboard/student");
  return response.data;
};

export const getStudentRoutines = async () => {
  const response = await api.get("/routines");
  return response.data;
};

export const getStudentExamRoutines = async () => {
  const response = await api.get("/exam-routines");
  return response.data;
};

export const getStudentAssignments = async () => {
  const response = await api.get("/assignments");
  return response.data;
};

export const getStudentNotices = async () => {
  const response = await api.get("/notices");
  return response.data;
};

export const getStudentCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const getStudentMaterials = async () => {
  const response = await api.get("/materials");
  return response.data;
};
