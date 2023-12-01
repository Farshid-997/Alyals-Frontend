'use client';
import { useUserLoginMutation } from '@/redux/api/authApi';
import dynamic from 'next/dynamic';
import { storeUserInfo } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
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
function Login() {
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
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4">
          <div className="lg:w-1/2 sm:w-full mt-3">
            <Image
              src={
                'https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=826&t=st=1700893544~exp=1700894144~hmac=c1687dff40a8fa80c08c09d5a29cd83ccb833d64c5edffc07cfedc57aa619088'
              }
              width={500}
              height={500}
              alt="login image"
              className="ms-52 mt-3"
            />
          </div>
          <div className="lg:w-1/2 sm:w-full  p-8 mt-36">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });
