/**
 * Created by Administrator on 2017/11/12 0012.
 */
import fetch from 'dva/fetch';
import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };

  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };

    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.join())
    .catch((err) => {
      if (err.code) {
        notification.error({
          message: err.name,
          description: err.message,
        });
      }
      if ('stack' in err && 'message' in err) {
        notification.error({
          message: `请求错误: ${url}`,
          description: err.message,
        });
      }
    });
}
