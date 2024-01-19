'use client';
import { useUserRegistrationMutation } from '@/redux/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { message } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import img1 from '../../Assest/register.json';
import Footer from '../home/footer';
import Navbar from '../home/navbar';
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contactNo: Yup.string()
    .required('contactNo is required')
    .min(11, 'contact No must be exactly 11 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string().required('Password is required'),
});
type FormValues = {
  email: string;
  password: string;
  contactNo: string;
  name: string;
};
function Register() {
  const [userLogin] = useUserRegistrationMutation();
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

      // console.log(res);
      if (res?.id) {
        message.success('User registered  successfully!');
        router.push('/login');
      }
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <h2 className="text-center text-3xl font-sans font-bold text-gray-700 mt-40 ">
        Register Here!!
      </h2>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 mx-auto max-w-screen-xl mt-10">
        <div className="min-h-40">
          <Player autoplay loop src={img1} className="h-1/5 w-80 mt-1">
            <Controls
              visible={false}
              buttons={['play', 'repeat', 'frame', 'debug']}
            />

          </Player>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="name"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                    errors?.name ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* email */}
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
          {/* password */}
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

          <div>
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <Controller
              name="contactNo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="contactNo"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                    errors?.contactNo ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.contactNo && (
              <p className="mt-2 text-sm text-red-600">
                {errors.contactNo.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform hover:scale-105 ease-in-out duration-300"
            >
              Register
            </button>

            <Link href="/login">
              <p className="text-cyan-600 hover:text-orange-400 text-md cursor-pointer mt-4">
                Already Register? Login Then..
              </p>
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default dynamic(() => Promise.resolve(Register), { ssr: false });
