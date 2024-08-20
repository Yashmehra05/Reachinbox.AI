import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <div className='bg-black min-h-screen flex flex-col justify-between items-center text-white'>
            {/* Header */}
            <div className=" h-16 flex justify-center items-center border-b border-slate-800">
                <img src="https://framerusercontent.com/images/8PWcQZ0bgrpF37lkxEL5GBh1w4s.png" alt="reachinbox-logo" className="h-7" />
            </div>

            {/* Main Content */}
            <div className='flex-grow flex justify-center items-center w-full'>
                <div className='w-[90%] max-w-[460px] h-auto bg-[#111214] rounded-2xl border border-gray-700 py-6 px-8 md:px-10'>
                    <div className='text-center'>
                        <p className='text-xl mb-6'>Create new account</p>
                        <div className='rounded border border-gray-500 h-12 flex justify-center items-center gap-2.5 mb-12 cursor-pointer'>
                            <img src="https://static.vecteezy.com/system/resources/previews/013/760/951/non_2x/colourful-google-logo-in-dark-background-free-vector.jpg" alt="Google logo" className='bg-black rounded-full h-5' />
                            <Link to="https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:5173/desktop" className='text-sm text-gray-400'>  Sign Up with Google</Link>
                        </div>
                        <p className='w-full bg-[#4B63DD] rounded py-2.5 mb-6 text-center cursor-pointer'>Create an account</p>
                        <p className='text-base text-gray-500'>Already have an account? <span className='text-white cursor-pointer'>Sign In</span></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full h-8 flex justify-center items-center border-t border-slate-800">
                <p className='text-gray-600 text-xs'>© 2024 Reachinbox. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Login;
