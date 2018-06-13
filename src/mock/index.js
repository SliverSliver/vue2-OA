import Mock from 'mockjs';
import loginAPI from './login';


// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo);

Mock.mock(/\/api\/getCount/, 'get', function () {
    return {
        inforList: [
            {
                type: '出勤天数',
                time: '5'
            }, {
                type: '迟到',
                time: '0'
            }, {
                type: '早退',
                time: '0'
            }, {
                type: '缺卡',
                time: '0'
            }, {
                type: '其他',
                time: '0'
            }]
    }
});

Mock.mock(/\/api\/getDate/, 'get', function () {
    return {
        inforList: [
            {
                date: '2018-06-09',
                start: '7:07:03',
                end: '17:07:03'
            }, {
                date: '2018-06-10',
                start: '7:07:45',
                end: '15:07:03'
            }, {
                date: '2018-06-11',
                start: '7:07:53',
                end: '17:07:03'
            }]
    }
});

Mock.mock(/\/register/, 'post', function () {
    return {
        "code": 200,
        "data": {
            "root": 0,
            "token": "77e925b3b262482da8706dd0c6bce161"
        },
        "msg": "success"
    }
});

Mock.mock(/\/login/, 'post', function () {
    return {
        "code": 200,
        "data": {
            "root": 0,
            "token": "ee0f8743817a453a8d4c6e687102457e"
        },
        "msg": "success"
    }
});


export default Mock;
