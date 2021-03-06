import { Api } from "../axios-config/AxiosConfig"
import { IRequestResult } from '../../interfaces/IRequestResult'
import { AxiosError } from "axios"

interface IUserSignup{
    name: string;
    email: string;
    username: string;
    password: string;
}

const signup =  async (user: IUserSignup): Promise<IRequestResult> => {
   try {

        await Api.post('/SignUp', user)
        return {success: true}

   } catch (error) {

    const err = error as AxiosError;
    const result : IRequestResult = {success:false, messages: []}

    if(err.response?.data){
        err.response.data.errors?.Password?.forEach((error: string) => {
            result.messages?.push('Senha: ' + error)
        });
        
        err.response.data.errors?.Email?.forEach((error: string) => {
            result.messages?.push('Email: ' +error)
        });

        err.response.data.errors?.Name?.forEach((error: string) => {
            result.messages?.push('Nome: ' +error)
        });

        err.response.data.errors?.username?.forEach((error: string) => {
            result.messages?.push('User name: ' +error)
        });

    }

    return result
}

}


 

export const SignupService = {
    signup
}
