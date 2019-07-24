import * as urls from './url';
import common from './api';

export default {
    login: (data) => common({url: urls.login, method: 'post', data}),
    captcha: () => common({url: urls.captcha, method: 'get'}),
    register: (data) => common({url: urls.register, method: 'post', data}),
    forgotPassword: (url) => common({url: urls.forgotPassword + url, method: 'get'}),
    resetPassword: (data) => common({url: urls.resetPassword, method: 'post', data}),
    loginOut: () => common({url: urls.loginOut, method: 'get'}),
    getList: (url) => common({url: urls.getList + url, method: 'get'}),
    deleteItem: (data) => common({url: urls.deleteItem, method: 'post', data}),
    addItem:(data) => common({url: urls.addItem, method: 'post', data}),
    getUploadList: (url) => common({url: urls.getUploadList + url, method: 'get'}),
    addBanner: (data) => common({url: urls.addBanner, method: 'post', data}),
    getBannerList: () => common({url: urls.getBannerList, method: 'get'}),
    deleteBanner: (data) => common({url: urls.deleteBanner, method: 'post', data})
}