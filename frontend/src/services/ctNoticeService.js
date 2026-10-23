import api from "./api";

const list = (response) => response.data?.data ?? response.data ?? [];

export const getCtNotices = async () => list(await api.get("/ct-notices"));
export const createCtNotice = async (payload) => list(await api.post("/ct-notices", payload));
export const updateCtNotice = async (id, payload) => list(await api.put(`/ct-notices/${id}`, payload));
export const deleteCtNotice = async (id) => (await api.delete(`/ct-notices/${id}`)).data;
