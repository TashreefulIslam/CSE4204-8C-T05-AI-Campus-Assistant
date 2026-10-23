import api from "./api";

const list = (response) => response.data?.data ?? response.data ?? [];

export const getMaterials = async () => list(await api.get("/course-materials"));
export const createMaterial = async (payload) => list(await api.post("/course-materials", payload));
export const deleteMaterial = async (id) => (await api.delete(`/course-materials/${id}`)).data;
