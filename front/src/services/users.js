import {api } from "boot/axios"

export const register = (params) => api.post('/users/register', params)
export const login = (params) => api.post('/users/login', params)
export const getUserProfile = () => api.get('/users/profile')