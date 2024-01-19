'use client';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { storeUserInfo } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { message } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import img1 from '../../Assest/Animation - 1705685002976.json';
import Footer from '../home/footer';
import Navbar from '../home/navbar';
const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string().required('Password is required'),
});

type FormValues = {
  email: string;
  password: string;
};

function NewLogin() {
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  console.log(errorMessage);
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log('res', res);
      // console.log(res);
      if (res?.accessToken) {
        router.push('/');
        message.success('User logged in successfully!');
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (error: any) {
      if (
        error.statusCode === 400 &&
        error.errorMessages &&
        error?.errorMessages.length > 0
      ) {
        const errorMessage = error.errorMessages[0].message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <Navbar />

      <h2 className="text-center text-3xl font-sans font-bold text-gray-700 mt-40 ">
        SignIn Here!!
      </h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 mx-auto max-w-screen-xl mt-10">
        <div>
          <Player
            autoplay
            loop
            src={img1}
           
          >
            <Controls
              visible={false}
              buttons={['play', 'repeat', 'frame', 'debug']}
            />
          </Player>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="email"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform hover:scale-105 ease-in-out duration-300"
            >
              Log in
            </button>

            <Link href="/register">
              <p className="text-cyan-600 hover:text-orange-400 text-md cursor-pointer mt-4">
                Are you new? Register Then..
              </p>
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default dynamic(() => Promise.resolve(NewLogin), { ssr: false });
