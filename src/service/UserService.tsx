import axios from "axios";

const BaseUrl='http://localhost:4000/user';

interface User{
     email: string; password: string;
}
interface User1 extends User{
      name: string;
}

interface User2{
     email: string;
     newPassword: string; 
     confNewPassword: string; 
}

 export const registerUser=(user:User1)=>{
        return axios.post(BaseUrl+"/register",user);
    }
 export const loginUser=(user:User)=>{
        return axios.post(BaseUrl+"/login",user);
    }
 export const createNewPassword=(user: User2)=>{
        return axios.put(BaseUrl+"/forget",user);
    }




