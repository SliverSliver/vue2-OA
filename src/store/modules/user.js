import {loginByEmail, logout, getInfo} from '../../api/login';
import Cookies from 'js-cookie';

const user = {
      state: {
        user: localStorage.getItem('user'),
        status: localStorage.getItem('status'),
        email: localStorage.getItem('email'),
        code: localStorage.getItem('code'),
        uid: undefined,
        auth_type: localStorage.getItem('auth_type'),
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        avatar: localStorage.getItem('avatar'),
        introduction: localStorage.getItem('introduction'),
        roles: [],
        setting: {
          articlePlatform: [],
        },
      },

      mutations: {
        SET_AUTH_TYPE: (state, type) => {
          state.auth_type = type;
        },
        SET_CODE: (state, code) => {
          state.code = code;
        },
        SET_TOKEN: (state, token) => {
          state.token = token;
        },
        SET_UID: (state, uid) => {
          state.uid = uid;
        },
        SET_EMAIL: (state, email) => {
          state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
          state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
          state.setting = setting;
        },
        SET_STATUS: (state, status) => {
          state.status = status;
        },
        SET_NAME: (state, name) => {
          state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
          state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
          state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
          console.log('login success');
        },
        LOGOUT_USER: state => {
          state.user = '';
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
              // commit('SET_TOKEN', '');
              commit('SET_ROLES', []);
              // Cookies.remove('Admin-Token');
              localStorage.clear();
              resolve();
            }).catch(error => {
              reject(error);
            });
          });
        },

        // 前端 登出
        FedLogOut({commit}) {
          return new Promise(resolve => {
            // commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            // Cookies.remove('Admin-Token');
            localStorage.clear();
            alert('has logout');
            resolve();
          });
        }
        ,
      },
    }
;

export default user;
