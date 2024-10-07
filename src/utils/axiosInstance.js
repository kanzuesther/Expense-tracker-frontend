import axios from 'axios';
import { API_URL } from '../constants';
import { STATUS_CODES } from './constants';
import { getLocalStorageItem } from './storage';

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getLocalStorageItem("user")?.token;
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }
        }

        return config;
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
      },
    (error) => {
        switch (error.response?.status) {
            case STATUS_CODES.UNAUTHORIZED:
                // window.location.href = "/login";
                break;

            case STATUS_CODES.BAD_REQUEST:
                throw new Error("Your submitted data is invalid, verify that data is correct and try again.");

            case STATUS_CODES.FORBIDDEN:
                throw new Error("You do not have permission to access this resource. Contact the administrator.");

            case STATUS_CODES.NOT_FOUND:
                throw new Error("Resource not found");

            case STATUS_CODES.METHOD_NOT_ALLOWED:
                throw new Error("Invalid method. Contact the administrator");

            case STATUS_CODES.REQUEST_TIMEOUT:
                throw new Error("The request timed out, please try again later.");

            case STATUS_CODES.UNSUPPORTED_MEDIA_TYPE:
                throw new Error("Unsupported media type passed, please check the data submitted");

            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                throw new Error("There was an error on the server-side, try again later. If the problem persists please contact the administrator");

            case STATUS_CODES.SERVICE_UNAVAILABLE:
                throw new Error("The service you requested is unavailable.");
            default:
                break;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;