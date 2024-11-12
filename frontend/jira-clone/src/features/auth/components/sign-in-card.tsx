import React, { useState } from "react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    //Kiem tra tinh hop le cua email
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    // Kiểm tra tính hợp lệ của mật khẩu
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của form trước khi gửi
    if (!emailError && !passwordError && email && password) {
      // Xử lý logic đăng ký ở đây
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-sky-100 bg-[url('/images/2.png')] bg-cover bg-center">
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Welcome back!</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email address"
              disabled={false}
            />
            <Input
              required
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              disabled={false}
              min={8}
              max={256}
            />
            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            disabled={false}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FcGoogle />
            Login with Google
          </Button>
          <Button
            disabled={false}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <FaGithub />
            Login with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

//     <>
//       {/* {/*
//               This example requires updating your template:

//               ```
//               <html class="h-full bg-white">
//               <body class="h-full">
//               ```
//             */}
//       <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-sky-100 bg-[url('/images/2.png')] bg-cover bg-center">
//         <div className="bg-gray-500 bg-opacity-45 backdrop-blur-lg p-10 rounded-lg shadow-lg w-1/4 mb-9">
//           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//             {/* <img
//                       alt="Your Company"
//                         src="/images/atlassian_jira.png"
//                       className="mx-auto h-10 w-auto"
//                   /> */}
//             <Image
//               alt="Your Company"
//               src="/images/atlassian_jira.png"
//               width={40}
//               height={40}
//               className="mx-auto h-10 w-auto"
//             />

//             <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//               Sign in
//             </h2>
//           </div>

//           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//             <form action="#" method="POST" className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm/6 font-medium text-gray-900"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     autoComplete="email"
//                     className="pl-2 pr-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center justify-between">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm/6 font-medium text-gray-900"
//                   >
//                     Password
//                   </label>
//                   <div className="text-sm">
//                     <a
//                       href="#"
//                       className="font-semibold text-blue-600 hover:text-blue-500"
//                     >
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     autoComplete="current-password"
//                     className="pl-2 pr-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>

//             <p className="mt-10 text-center text-sm/6 text-gray-500">
//               or{" "}
//               <a
//                 href="#"
//                 className="font-semibold text-blue-600 hover:text-blue-500"
//               >
//                 Sign Up
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }; */}
