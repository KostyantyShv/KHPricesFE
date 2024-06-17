import axios from 'axios';
import { LoginUser, RegisterUser } from '../interfaces/user';


export const signUp = async (user: RegisterUser) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/auth/sign-up`, user);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const signIn = async (user: LoginUser) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/auth/sign-in`, user);
    return response; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const searchStations = async (searchQuery: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/stations/search?${searchQuery}`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

}

export const getFuelTypes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/fuel-type/get-all`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

}

export const getFacilityList = async () => { 
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/facility/get-all`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const getBrandsList = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL_V_1_1}/brands/get-all`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
} 

