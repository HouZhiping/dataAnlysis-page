import axios from 'axios';
import {BASE_URL,HOST} from 'api/urlConfig';

// let BASE_URL = 'http://localHOST:8089'; //公用url部分
// let HOST = 'http://localHOST:8080/Urban/rest';
var rootIP = process.env.API_ROOT;

export const requestLogin = params => { return axios.post(`${BASE_URL}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${BASE_URL}/user/list`, { params: params }); };

//真实环境时，禁掉mock，请求真实后台地址
export const getUserList1 = params => { return axios.get(HOST+`/user/queryAllUser`); };

export const getUserList2 = params => { return axios.get(`/user/queryAllUser`); };

export const getUserListPage = params =>
{ return axios.get(`${BASE_URL}/qureyPopulationByPage`, { params: params }); };

/*export const removeUser = params => { return axios.get(`${BASE_URL}/user/remove`, { params: params }); };*/

export const batchRemoveUser = params => { return axios.get(`${BASE_URL}/user/batchremove`, { params: params }); };

/*export const editUser = params => { return axios.get(`${BASE_URL}/user/edit`, { params: params }); };*/

// export const addUser = params => { return axios.get(`${BASE_URL}/user/add`, { params: params }); };

export const getInfoList = params => { return axios.get(`${BASE_URL}/info/list`, {params:params}); };
// 联系我们
export const getTelephone = params=>{return axios.get(`${BASE_URL}/telephone/list`, {params:params});};

/**
 * 获取家庭分页列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getFamilyListPage = params =>
{ return axios.get(`${BASE_URL}/family/listUnderPage`, { params: params }); };

/**
 * 添加家庭对象
 * @param params
 * @returns {AxiosPromise}
 */
export const addFamily = params => { return axios.get(`${BASE_URL}/family/addFamily`, { params: params }); };

/**
 * 删除家庭对象
 * @param params
 * @returns {AxiosPromise}
 */
export const removeFamily = params => { return axios.get(`${BASE_URL}/family/removeFamily`, { params: params }); };

/**
 * 编辑家庭信息
 * @param params
 * @returns {AxiosPromise}
 */
export const editFamily = params => { return axios.get(`${BASE_URL}/family/editFamily`, { params: params }); };

/**
 * 批量删除
 * @param params
 * @returns {AxiosPromise}
 */
export const batchRemoveFamily = params => { return axios.get(`${BASE_URL}/family/batchRemoveFamily`, { params: params }); };