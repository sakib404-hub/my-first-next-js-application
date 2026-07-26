import React from "react";
import RegisterForm from "../_components/RegistratationForm";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg">
          
          {/* this is for the  generic texts */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-500">
              Fill in your details to create your new account
            </p>
          </div>

          {/* this is for the interactive form */}
          <div>
            <RegisterForm></RegisterForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
