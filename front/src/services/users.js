import {api } from "boot/axios"

export const register = () => api.post('/users/register', params)
export const login = () => api.post('/users/login', params)
