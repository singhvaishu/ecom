import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

  increment,
  incrementAsync,

} from './authSlice';
// import styles from './Counter.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { checkUserAsync, selectError, selectLoggedInUser } from '../components/authSlice';
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors)

  return (
    <>
      {user && <Navigate to="/" replace={true}  ></Navigate>}
      {console.log(user)}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" noValidate
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();
              dispatch(checkUserAsync(data))
            })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  // name="email"
                  type="email"
                  {...register("email", {
                    required: "Enter email Id",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not valid",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: 'password is required'
                  })}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              {errors && (
                <p className="text-red-600">{errors.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
      </div >
    </>
  );
}
