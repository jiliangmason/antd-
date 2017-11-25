/**
 * Created by Administrator on 2017/11/19 0019.
 */
const context = require.context('./', false, /\.js$/); // 本文件夹下所有以js结尾的文件
const keys = context.keys().filter(item => item !== './index.js');

const models = [];
for (let i = 0; i < keys.length; i++) {
  models.push(context(keys[i]));
}

export default models;
