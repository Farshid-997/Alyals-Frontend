'use client';
import { useUserRegistrationMutation } from '@/redux/api/authApi';
import dynamic from 'next/dynamic';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
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
      <div>
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-4 grid lg:grid-cols-2 gap-2 ">
          <div className="lg:w-1/2 sm:w-full ">
            <Image
              src={
                'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=826&t=st=1700891724~exp=1700892324~hmac=5335c01f411b88480eebd0d70ebe5fde4b986ebebd32b503d8e7d752dab00162'
              }
              width={500}
              height={500}
              alt="login image"
              className="ms-52 mt-3"
            />

            {/* <video
            loop={true}
            autoPlay="autoplay"
            muted
            className="lotti-why w-75"
          >
            <source src={vdo2} type="video/mp4" />
          </video> */}

            {/* name */}
          </div>

          <div className="lg:w-1/2 sm:w-full bg-white p-8 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
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
        </div>
      </div>

      <Footer />
    </>
  );
}

export default dynamic(() => Promise.resolve(Register), { ssr: false });
