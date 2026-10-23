import api from "./api";

const unwrapData = (response) => {
  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }

  if (response?.data && typeof response.data === "object") {
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    }

    if (response.data.data && typeof response.data.data === "object") {
      return response.data.data;
    }

    if (response.data.user) {
      return response.data.user;
    }
  }

  return response?.data ?? [];
};

export const getAdminProfile = async () => {
  const response = await api.get("/profile");
  return response.data?.user ?? response.data ?? {};
};

export const updateAdminProfile = async (userId, payload) => {
  const response = await api.put(`/users/${userId}`, payload);
  return response.data?.data ?? response.data ?? {};
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return unwrapData(response);
};

export const createUser = async (payload) => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const updateUser = async (id, payload) => {
  const response = await api.put(`/users/${id}`, payload);
  return response.data?.data ?? response.data ?? {};
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getEnrollments = async () => {
  const response = await api.get("/enrollments");
  return response.data?.data ?? response.data ?? [];
};

export const createEnrollment = async (payload) => {
  const response = await api.post("/enrollments", payload);
  return response.data?.data ?? response.data ?? {};
};

export const getCourses = async () => {
  const response = await api.get("/courses");
  return Array.isArray(response.data) ? response.data : unwrapData(response);
};

export const createCourse = async (payload) => {
  const response = await api.post("/courses", payload);
  return response.data?.course ?? response.data ?? {};
};

export const updateCourse = async (id, payload) => {
  const response = await api.put(`/courses/${id}`, payload);
  return response.data?.course ?? response.data ?? {};
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const getRoutines = async () => {
  const response = await api.get("/routines");
  return response.data?.data ?? unwrapData(response);
};

export const createRoutine = async (payload) => {
  const response = await api.post("/routines", payload);
  return response.data?.data ?? response.data ?? {};
};

export const updateRoutine = async (id, payload) => {
  const response = await api.put(`/routines/${id}`, payload);
  return response.data?.data ?? response.data ?? {};
};

export const deleteRoutine = async (id) => {
  const response = await api.delete(`/routines/${id}`);
  return response.data;
};

export const getExamRoutines = async () => {
  const response = await api.get("/exam-routines");
  return response.data?.data ?? unwrapData(response);
};

export const createExamRoutine = async (payload) => {
  const response = await api.post("/exam-routines", payload);
  return response.data?.data ?? response.data ?? {};
};

export const updateExamRoutine = async (id, payload) => {
  const response = await api.put(`/exam-routines/${id}`, payload);
  return response.data?.data ?? response.data ?? {};
};

export const deleteExamRoutine = async (id) => {
  const response = await api.delete(`/exam-routines/${id}`);
  return response.data;
};

export const getNotices = async () => {
  const response = await api.get("/notices");
  return Array.isArray(response.data) ? response.data : unwrapData(response);
};

export const createNotice = async (payload) => {
  const response = await api.post("/notices", payload);
  return response.data?.notice ?? response.data ?? {};
};

export const updateNotice = async (id, payload) => {
  const response = await api.put(`/notices/${id}`, payload);
  return response.data?.notice ?? response.data ?? {};
};

export const deleteNotice = async (id) => {
  const response = await api.delete(`/notices/${id}`);
  return response.data;
};
