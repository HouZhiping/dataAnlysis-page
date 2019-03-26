import axios from 'axios';
import {BASE_URL,HOST} from 'api/urlConfig';

export const getTargeInfo = params => { return axios.get(`${BASE_URL}/relation/list`, { params: params }); };