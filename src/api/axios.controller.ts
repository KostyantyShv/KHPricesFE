import { LoginUser, RegisterUser } from "../interfaces/user";
import { getBrandsList, getFacilityList, getFuelTypes, searchStations, signIn, signUp } from "./axios.service";

export const signUpNewUser = async (user: RegisterUser) => {
  try {
    const response = await signUp(user);
    return response.data;
  } catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
export const signInUser = async (user: LoginUser) => {
  try {
    const response = await signIn(user);
    return response.data;
  } catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const searchStationsController = async (searchQuery: string) => {
  try{
    const response = await searchStations(searchQuery)
    return response.data;
  }
  catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllFuelTypes = async () => { 
  try{
    const response = await getFuelTypes()
    return response.data;
  }
  catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllFacilities= async () => { 
  try{
    const response = await getFacilityList()
    return response.data;
  }
  catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllBrands = async () => { 
  try{
    const response = await getBrandsList()
    return response.data;
  }
  catch (error) {
    if (error instanceof Error) { 
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}