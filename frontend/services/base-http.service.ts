import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
});

export default class BaseHttpService {
  API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

  async get(endpoint: string, options = {}) {
    // Object.assign(options, this._getCommonOptions());
    return axios
      .get(endpoint, options)
      .catch((error) => this._handleHttpError(error));
  }

  async post(endpoint: string, data = {}, options: AxiosRequestConfig<{}> = {}) {
    return instance
      .post(endpoint, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  async delete(endpoint: string, options = {}) {
    // Object.assign(options, this._getCommonOptions());
    return axios
      .delete(endpoint, options)
      .catch((error) => this._handleHttpError(error));
  }

  async patch(endpoint: string, data = {}, options = {}) {
    // Object.assign(options, this._getCommonOptions());
    return axios
      .patch(endpoint, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  _handleHttpError(error: any) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401();
    }
  }

  _handle401() {
    Router.push('/login');
  }
}
