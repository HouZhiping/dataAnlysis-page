import axios from 'axios';
import {BASE_URL,HOST} from 'api/urlConfig';

/**
 * 获取村民的列表（分页）
 * @param params
 * @returns {AxiosPromise}
 */
export const getPopulationListPage = params =>
{ return axios.get(`${BASE_URL}/population/qureyPopulationByPage`, { params: params }); };


export const getNationInfo = params =>
{ return axios.get(`${BASE_URL}/population/getNationInfo`, { params: params }); };

export const addPopulation = params => { return axios.get(`${BASE_URL}/population/addPopulation`, { params: params }); };

export const getGroupInfo = params => { return axios.get(`${BASE_URL}/population/getGroupInfo`, { params: params }); };

export const removePopulation = params => { return axios.get(`${BASE_URL}/population/removePopulation`, { params: params }); };

export const editPopulation = params => { return axios.get(`${BASE_URL}/population/editPopulation`, { params: params }); };


