import axios from '@/libs/api.request'

export const login = ({ phone, password }) => {
  const data = {
    phone,
    password
  }
  return axios.request({
    url: '/auth/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/session/profile',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'get'
  })
}

export const changePassword = (token, form) => {
  return axios.request({
    url: '/session/password',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: form,
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/session/logout',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'delete'
  })
}

export const getVerification = (token) => {
  return axios.request({
    url: '/session/verification',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'get'
  })
}

export const postVerification = (token, form) => {
  return axios.request({
    url: '/session/verification',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'post',
    data: form
  })
}

export const postVerify = (token) => {
  return axios.request({
    url: '/session/verify',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'post',
  })
}

export const getCaptcha = (token) => {
  return axios.request({
    url: '/session/captcha',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'get',
  })
}

export const checkCaptcha = (token, form) => {
  return axios.request({
    url: '/session/captcha',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'post',
    data: form,
  })
}
