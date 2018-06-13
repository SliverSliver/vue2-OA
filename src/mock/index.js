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
            "root": 100,
            "token": "ee0f8743817a453a8d4c6e687102457e"
        },
        "msg": "success"
    }
});

Mock.mock(/\/admin\/users/, 'get', function () {
    return {
        "code": 200,
        "data": [
            {
                "id": 203238190990102530,
                "root": 0,
                "username": "test"
            },
            {
                "id": 203608302536495100,
                "root": 0,
                "username": "abcd"
            },
            {
                "id": 203610673207447550,
                "root": 0,
                "username": "aaaaa"
            }
        ],
        "msg": "success"
    }
});

Mock.mock(/\/admin\/applications/, 'get', function () {
    return {
        "code": 200,
        "data": [
            {
                "application": {
                    "beginDate": "2018-06-15",
                    "endDate": "2018-06-16",
                    "id": 203239153591259140,
                    "result": 1,
                    "type": 1,
                    "userId": 203238190990102530
                },
                "user": {
                    "id": 203238190990102530,
                    "root": 0,
                    "username": "test"
                }
            },
            {
                "application": {
                    "beginDate": "2018-06-15",
                    "endDate": "2018-06-16",
                    "id": 203676810729361400,
                    "result": 0,
                    "type": 1,
                    "userId": 197905437511782400
                },
                "user": {
                    "id": 197905437511782400,
                    "root": 100,
                    "username": "Soloist"
                }
            }
        ],
        "msg": "success"
    }
});


export default Mock;
