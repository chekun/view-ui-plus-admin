import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    name: '',
    phone: '',
    avatar: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
  },
  mutations: {
    setProfile (state, profile) {
      state.avatar = profile.avatar || ''
      state.name = profile.screen_name || ''
      state.phone = profile.phone || ''
      state.access = profile.permissions || []
    },
    clearProfile (state) {
      state.avatar = ''
      state.name = ''
      state.phone = ''
      state.access = []
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName: phone, password }) {
      phone = phone.trim()
      return new Promise((resolve, reject) => {
        login({
          phone,
          password
        }).then(res => {
          const { data, status, message } = res.data
          if (status) {
            commit('setToken', data.token)
            resolve()
          } else {
            reject(message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('clearProfile')
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const { profile } = res.data.data
            commit('setProfile', profile)
            commit('setHasGetInfo', true)
            resolve(profile)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
