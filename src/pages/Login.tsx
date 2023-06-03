import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createNewPassword, loginUser } from '../service/UserService';
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';
import patel from '../../src/images/petals 1.png'
import logoName from '../../src/images/Frame 45 2.png'
import logolinked from '../../src/images/Vector.png'
import logoface from '../../src/images/Vector (2).png'
import logoinst from '../../src/images/Vector (3).png'
import Signup from './Signup';

interface User {
    email: string; password: string;
}

interface User2 {
    email: string;
    newPassword: string;
    confNewPassword: string;
}

interface ApiResponse {
    data: {
        message: Renderable | ValueFunction<Renderable, Toast>;
        success?: boolean;
        user?: {
            role: string;
        };
    };
    response?: {
        data: {
            message: Renderable | ValueFunction<Renderable, Toast>;
        };
    };
}

export default function Login() {

    const [resetOpt, setResetOpt] = useState<Boolean>(false)
    const [signupForm, setSignupForm] = useState<Boolean>(true)



    const [loginData, setloginData] = useState<User>({
        email: "",
        password: ""
    })


    const [resetData, setResetData] = useState<User2>({
        email: "",
        newPassword: "",
        confNewPassword: ""
    })

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setloginData({ ...loginData, [event.target.name]: event.target.value });
    }

    function handleChangePass(event: React.ChangeEvent<HTMLInputElement>) {
        setResetData({ ...resetData, [event.target.name]: event.target.value });

    }




    function handleNewPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createNewPassword(resetData)
            .then((res: ApiResponse) => {
                console.log(res.data)
                toast(res.data.message)
                setResetOpt(false)
            })
            .catch((error: ApiResponse) => {
                console.log("request mai error aara hai")
                console.log(error)
                toast(error?.response?.data?.message || 'An error occurred, please try again later.');
            })
    }


    function handle(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        loginUser(loginData)
            .then((res: ApiResponse) => {
                localStorage.setItem('userData', JSON.stringify(res.data))
                if (res.data.success == true) {
                    toast('loging successfully')
                    navigate("/dashboard")

                }
            })
            .catch((error: ApiResponse) => {
                console.log("request mai error aara hai")
                toast(error?.response?.data?.message || 'An error occurred, please try again later.');
                console.log(error)

            })
    }

    function handlePass(event: React.MouseEvent<HTMLParagraphElement>) {
        event.preventDefault()
        setResetOpt(true)

    }





    return (
        <div className=' sm:w-[1280px] sm:h-[609px]  bg-white relative flex justify-between px-5 mx-auto'>


            <div className='mt-7  w-[620px] h-[555px] rounded-[20px] bg-hero p-[26px] flex flex-col justify-between'>
                <div className='w-fit '>
                <img src={logoName} alt="" />
                </div>
                <div className=''>
                <p className='text-[38px] font-[600] leading-[30px] text-white mt-[100px]'>100% Uptime😎 
                <span className='text-[#BFBFBF] font-[300] text-[28px] space-y-0'> <br /> Zero Infrastructure <br /> Management</span></p>
               
               <div className='flex gap-1 mt-5'>
                <div className='w-5 h-2 rounded-full bg-white'></div>
                <div className='w-2 h-2 rounded-full bg-white'></div>
                <div className='w-2 h-2 rounded-full bg-white'></div>
               </div>
                </div>
                
                <div className='flex justify-between '>
                    <small className='text-[#BFBFBF]'>aesthisia.com</small>
                    <div className='flex gap-1'>
                        <img src={logolinked} alt="" />
                        <img src={logoface} alt="" />
                        <img src={logoinst} alt="" />
                    </div>
                </div>
            </div>




            <div className=" sm:w-[360px] mx-auto">

                <div className=' flex flex-col items-center'>
                    <img src={patel} alt="" className='mt-[78px] w-[61px] h-[49px]' />
                    <h1 className='text-[34px] font-[500]'>Welcome <span className='text-[#08A593]'>Back</span></h1>
                    <small className='text-[14px] text-[#667085]'>Glad to see you, Again!</small>
                </div>

                {!resetOpt && <div className="mt-10 sm:w-full">
                    {signupForm && <form className="" onSubmit={handle}>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            autoComplete="email"
                            placeholder='Enter your email'
                            required
                            className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        />

                      
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            placeholder='Enter your password'
                            className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                        />
  <p className="font-semibold text-[#667085] text-[12px] text-right cursor-pointer" onClick={handlePass}>
                            Forgot password?
                        </p>

                        <button
                            type='submit'
                            className="mt-3 rounded-md py-2 bg-black text-white w-full"
                        >
                            Login in
                        </button>

                    </form>}
                    {!signupForm && <Signup />}

                    {signupForm && <p className="mt-5 text-center text-sm text-gray-300 flex justify-center items-center gap-1">
                        Don’t have an account yet?
                        <div onClick={() => setSignupForm(false)} className=" cursor-pointer font-semibold leading-6 text-green-600 hover:text-green-500">
                            Sign Up
                        </div>
                    </p>}

                    {!signupForm && <div className="mt-5 text-center text-sm text-gray-300 flex justify-center items-center gap-1">
                        Already have an account?
                        <div onClick={() => setSignupForm(true)} className=" cursor-pointer font-semibold leading-6 text-green-600 hover:text-green-500" >
                            Log in
                        </div>.
                    </div>}

                </div>}


                {resetOpt && <div className='mt-10 sm:w-full'>
                <form onSubmit={handleNewPassword} className="">
                    <div className="">

                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                            Verify your account
                        </h2>
                    </div>
                                    <input
                                        name="email"
                                        type="text"
                                        onChange={handleChangePass}
                                        placeholder='ente email'
                                        required
                                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                                    />

                     
                                    <input
                                        name="newPassword"
                                        type="password"
                                        onChange={handleChangePass}
                                        required
                                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                                    />
                            

                        
                                    <input
                                        name="confNewPassword"
                                        type="password"
                                        onChange={handleChangePass}
                                        required
                                        className="block border border-grey-light w-full p-2 rounded-[10px] mb-4 mt-[20px]"
                                    />
                             

                                <button
                                    type='submit'
                                    className="mt-3 rounded-md py-2 bg-black text-white w-full"
                                >
                                    Reset Password
                                </button>

                     

                    

                    {resetOpt && <button
                        onClick={() => setResetOpt(false)}
                        className="mt-3 rounded-md py-2 bg-black text-white w-full"
                    >
                        cancel
                    </button>}
                </form>
                </div>}
            
            </div>
        </div>
    )
}

