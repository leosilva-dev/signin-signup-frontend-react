import { Api } from "../axios-config/AxiosConfig"
import { IRequestResult } from '../../interfaces/IRequestResult'
import { AxiosError } from "axios"



const signin =  async (email: string, password: string): Promise<IRequestResult> => {
   try {

        await Api.post('/Signin', undefined, {headers: {email, password}})
        return {success: true}

   } catch (error) {

    const err = error as AxiosError;
    const result : IRequestResult = {success:false, messages: []}

    if(err.response?.data){
        err.response.data.errors?.emailOrPassword?.forEach((error: string) => {
            result.messages?.push(error)
        });
        
    }else if(err.message === "Network Error"){
        if(result.messages){
            result.messages.push("Você está offline...")
        }
    }

    return result
}

}


 

export const SigninService = {
    signin
}
