import {param2Obj} from 'utils';

const userMap = {
    admin: {
        role: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        name: 'Super Admin',
        uid: '000'
    },
    normal: {
        role: ['normal'],
        token: 'normal',
        introduction: '我是普通用户',
        name: 'Normal Editor',
        uid: '002'

    },
    developer: {
        role: ['developer'],
        token: 'developer',
        introduction: '我是开发',
        name: '工程师小王',
        uid: '003'
    }
};

export default {
    loginByEmail: config => {
        const {email} = JSON.parse(config.body);
        return userMap[email.split('@')[0]];
    },
    getInfo: config => {
        const {token} = param2Obj(config.url);
        if (userMap[token]) {
            return userMap[token];
        } else {
            return Promise.reject('a');
        }
    },
    logout: () => 'success'
};
