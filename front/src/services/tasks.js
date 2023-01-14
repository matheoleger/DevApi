import { api } from "boot/axios"

export const createTask = (params) => {
    return api.post("/tasks", params)
}

export const updateTask = (id, params) => {
    return api.put(`/tasks/${id}`, params)
}