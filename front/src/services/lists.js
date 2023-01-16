import { api } from "boot/axios";

export const getAllLists = () => {
    return api.get("/lists")
}

export const getListById = (id) => {
    return api.get(`/lists/${id}`)
}

export const createList = (params) => {
    return api.post("/lists", params)
}

export const deleteList = (id) => {
    return api.delete(`/lists/${id}`)
}

export const updateList = (id, params) => {
    return api.put(`/lists/${id}`, params)
}