/*入口文件*/

import React from 'react';
import ReactDom from 'react-dom';

// import 'antd/dist/antd.min.css';

import App from './App.js';

import storageUtils from './utils/storageUtils.js'
import memoryUtils from './utils/memoryUtils.js'

const current_user = storageUtils.getUser()
memoryUtils.user = current_user

ReactDom.render(
    <App />,
    document.getElementById('root')
);