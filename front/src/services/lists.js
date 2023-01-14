import { api } from "boot/axios";

export const getAllLists = () => {
    return api.get("/lists")
}

export const getListById = (id) => {
    return api.get("/lists/:id", id)
}

export const createList = (params) => {
    return api.post("/lists", params)
}

export const deleteList = (params) => {
    return api.delete("/lists/:id", params)
}

export const updateList = (params) => {
    return api.put("/lists/:id", params)
}