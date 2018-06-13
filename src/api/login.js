import fetch from 'utils/fetch';
import Qs from 'qs';

export function loginByEmail(email, password) {
  const data = Qs.stringify(
      {
        username: email,
        password: password,
      },
  );
  return fetch({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: '/login',
    method: 'post',
    data
  });
}

export function logout(token) {
  return fetch({
    url: '/users',
    method: 'delete',
    headers: {
      'token': token
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/users',
    method: 'get',
    headers: {
      'token': token
    }
  });
}

