import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../service/UserService';
import { toast } from 'react-hot-toast';

interface SignupData {
    name: string;
    email: string;
    confPassword: string;
    password: string;
  }

  interface ApiResponse {
    status: number;
    data: {
      message: string;
    };
  }
  
  function Signup() {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState<SignupData>({
      name: '',
      email: '',
      password: '',
      confPassword:''
    });
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setSignupData({ ...signupData, [event.target.name]: event.target.value });
  
    }
  
    function savehandle(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      registerUser(signupData)
        .then((res:ApiResponse) => {
          if (res.status === 201) toast('user registered successfully');
          console.log(res.data.message);
          setSignupData({
            name: '',
            email: '',
            confPassword: '',
            password: ''
          });
          navigate('/');
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  
  return (
 
            <div className="sm:w-[360px] mx-auto">
                <form onSubmit={savehandle} className=" rounded text-black w-full">
           
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        name="name"
                        placeholder="Name" 
                        required
                        value={signupData.name}
                        onChange={handleChange}
                        />
                    

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        name="email"
                        required
                        onChange={handleChange}
                        value={signupData.email}
                        placeholder="Email" />


                   

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        name="password"
                        placeholder="Password"
                        required
                        value={signupData.password}
                        onChange={handleChange}
                         />
                        
                        <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        name="confPassword"
                        placeholder="Confirm password"
                        required
                        value={signupData.confPassword} 
                        onChange={handleChange}
                        />
                     
                    <button
                       type='submit'
                        className="w-full text-center py-2 rounded bg-green text-white bg-black focus:outline-none my-1"
                    >Create Account</button>
                </form>
                

            </div>
      
     
  )
}

export default Signup