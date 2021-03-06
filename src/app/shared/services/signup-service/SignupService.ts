import { Api } from "../axios-config/AxiosConfig"

interface IUserSignup{
    name: string;
    email: string;
    username: string;
    password: string;
}

const signup =  async (user: IUserSignup): Promise<Boolean> => {
   try {
        await Api.post('/SignUp', user)
        return true
   } catch (error) {
        return false
   }

   
}

export const SignupService = {
    signup
}