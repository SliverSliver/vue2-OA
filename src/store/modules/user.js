import {loginByEmail, logout, getInfo} from '../../api/login';
import Cookies from 'js-cookie';

const user = {
      state: {
        token: '',
        roles: '',
        setting: {
          articlePlatform: [],
        },
      },

      mutations: {
        SET_TOKEN: (state, token) => {
          state.token = token;
        },
        SET_ROLES: (state, roles) => {
          state.roles = roles;
        },
      },

      actions: {
        // 邮箱登录
        LoginByEmail({commit}, userInfo) {
          const email = userInfo.email.trim();
          return new Promise((resolve, reject) => {
            loginByEmail(email, userInfo.password).then(response => {
              const data = response.data.data;
              localStorage.setItem('token', data.token);
              // Cookies.set('Admin-Token', data.token);
              commit('SET_TOKEN', data.token);
              // commit('SET_ROLES', email);
              resolve();
            }).catch(error => {
              reject(error);
            });
          });
        },

        // 获取用户信息
        GetInfo({commit, state}) {
          return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
              const data = response.data.data;
              let roles;
              if (data.root > 0) {
                roles = 'admin';
                // commit('SET_ROLES', 'admin');
              } else {
                roles = 'normal';
                // commit('SET_ROLES', 'normal');
              }
              localStorage.setItem('roles', roles);
              commit('SET_ROLES', roles);
              // commit('SET_NAME', data.name);
              // commit('SET_AVATAR', data.avatar);
              // commit('SET_UID', data.uid);
              // commit('SET_INTRODUCTION', data.introduction);
              resolve(roles);
            }).catch(error => {
              console.log(error);
              reject(error);
            });
          });
        },

        // 第三方验证登录
        // LoginByThirdparty({commit, state}, code) {
        //     return new Promise((resolve, reject) => {
        //         commit('SET_CODE', code);
        //         loginByThirdparty(state.status, state.email, state.code,
        //             state.auth_type).then(response => {
        //             commit('SET_TOKEN', response.data.token);
        //             Cookies.set('Admin-Token', response.data.token);
        //             resolve();
        //         }).catch(error => {
        //             reject(error);
        //         });
        //     });
        // },

        // 登出
        LogOut({commit, state}) {
          return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
              commit('SET_TOKEN', '');
              commit('SET_ROLES', '');
              // Cookies.remove('Admin-Token');
              localStorage.removeItem('token');
              localStorage.removeItem('roles');
              // Cookies.clear();
              resolve();
            }).catch(error => {
              reject(error);
            });
          });
        },

        // 前端 登出
        FedLogOut({commit}) {
          return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', '');
            // Cookies.remove('Admin-Token');
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            alert('已登出');
            resolve();
          });
        },

        // 刷新用户状态
        Flash_UserInfo({commit, state}) {
          return new Promise((resolve, reject) => {
              commit('SET_TOKEN', localStorage.getItem('token'));
              commit('SET_ROLES', localStorage.getItem('roles'));
              // Cookies.remove('Admin-Token');
              // Cookies.get('token');
              // Cookies.clear();
              resolve(localStorage.getItem('token'));
          });
        },
      },
    }
;

export default user;
