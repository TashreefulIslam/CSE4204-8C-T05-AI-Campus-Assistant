import api from "./api";

export const getProfile = async () => (await api.get("/profile")).data?.user ?? {};
export const updateProfile = async (payload) => (await api.put("/profile", payload)).data?.user ?? {};
export const updatePassword = async (payload) => (await api.put("/update-password", payload)).data;
