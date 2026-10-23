import api from "./api";

const list = (response) => response.data?.data ?? response.data ?? [];

export const getAssignments = async () => list(await api.get("/assignments"));
export const getAssignment = async (id) => (await api.get(`/assignments/${id}`)).data;
export const createAssignment = async (payload) => (await api.post("/assignments", payload)).data;
export const updateAssignment = async (id, payload) => (await api.put(`/assignments/${id}`, payload)).data;
export const deleteAssignment = async (id) => (await api.delete(`/assignments/${id}`)).data;
