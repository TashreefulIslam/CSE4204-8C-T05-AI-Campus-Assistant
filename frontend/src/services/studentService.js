import api from "./api";

export const getStudentDashboard = async () => {
  const response = await api.get("/student/resources/dashboard");
  return response.data;
};

export const getStudentRoutines = async () => {
  const response = await api.get("/student/resources/routines");
  return response.data;
};

export const getStudentExamRoutines = async () => {
  const response = await api.get("/student/resources/exams");
  return response.data;
};

export const getStudentAssignments = async () => {
  const response = await api.get("/student/resources/assignments");
  return response.data;
};

export const getStudentNotices = async () => {
  const response = await api.get("/student/resources/notices");
  return response.data;
};

export const getStudentCourses = async () => {
  const response = await api.get("/student/resources/courses");
  return response.data;
};

export const getStudentMaterials = async () => {
  const response = await api.get("/student/resources/materials");
  return response.data;
};

export const completeStudentAssignment = async (id) => {
  const response = await api.post(`/student/resources/assignments/${id}/complete`);
  return response.data;
};

export const downloadStudentMaterial = async (id) => {
  const response = await api.get(`/student/resources/materials/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};
