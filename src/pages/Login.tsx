import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

export default function Login(){
    const [form, setForm] = useState<string>("login")
    return (
        <div className="bg-gradient-to-t from-red-500 to-white h-screen w-screen flex items-center justify-center flex-col">
            <div className="bg-gray-600 shadow-lg p-8 flex flex-col items-center gap-12">

                <div className="flex flex-row items-center text-2xl">
                    <button className={`${form === 'signup' ? 'bg-red-400 text-white' : 'bg-gray-500 text-gray-200'} hover:bg-red-400 transition-colors duration-700 py-[1rem] px-[8rem] cursor-pointer `}
                        onClick={() => setForm('signup')}
                    >
                        Sign Up
                    </button>
                    <button className={`${form === 'login' ? 'bg-red-400 text-white' : 'bg-gray-500 text-gray-100'} hover:bg-red-400 transition-colors duration-700 py-[1rem] px-[8rem] cursor-pointer`}
                        onClick={() => setForm('login')}
                    >
                        Login
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {form === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-full flex flex-col items-center">
                                <span className="text-4xl text-white">Welcome back!</span>

                                <form className="flex flex-col gap-10 mt-12 text-white text-xl">
                                    <input type="text" required placeholder="Username" className="w-[40rem] px-4 py-2 border border-white bg-transparent focus:outline-none focus:border focus:border-red-400 transition-colors duration-400"
                                    />

                                    <input type="password" required placeholder="Password" className="w-[40rem] px-4 py-2 border border-white bg-transparent focus:outline-none focus:border focus:border-red-400 transition-colors duration-400"/>

                                    <button type="button" className="text-red-400 hover:text-red-500 hover:text-shadow transition-colors duration-300 ml-auto cursor-pointer">Forgot Password?</button>

                                    <button type="submit" className="bg-red-400 shadow-lg hover:bg-red-500 transition-colors duration-700 py-4 text-white font-bold text-4xl cursor-pointer">LOGIN</button>
                                </form>
                            </div>
                        </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-full flex flex-col items-center">
                            <span className="text-4xl text-white">Create an account</span>

                            <form className="flex flex-col gap-10 mt-12 text-white text-xl">
                                <input type="text" required placeholder="Username" className="w-[40rem] px-4 py-2 border border-white bg-transparent focus:outline-none focus:border focus:border-red-400 transition-colors duration-400"
                                />

                                <input type="email" required placeholder="Email" className="w-[40rem] px-4 py-2 border border-white bg-transparent focus:outline-none focus:border focus:border-red-400 transition-colors duration-400"
                                />

                                <input type="password" required placeholder="Password" className="w-[40rem] px-4 py-2 border border-white bg-transparent focus:outline-none focus:border focus:border-red-400 transition-colors duration-400"
                                />

                                <button type="submit" className="bg-red-400 shadow-lg hover:bg-red-500 transition-colors duration-700 py-4 text-white font-bold text-4xl cursor-pointer">SIGN UP</button>
                            </form>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    )
}