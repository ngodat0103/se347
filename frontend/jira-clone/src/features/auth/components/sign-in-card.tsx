import React, { useState } from "react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Sử dụng useRouter từ next/navigation
import { login } from "@/services/user_api";
import {
  Form,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";

//Dinh nghia schema cho form
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters").max(256),
});

export const SignInCard = () => {
  //useForm quan ly trang thai form va valdation
  //zodResolver tich hop zod de xu ly val
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      const token = response.accessToken?.tokenValue;
      if (token) {
        // Lưu token vào cookie
        Cookies.set("accessToken", token, { expires: 7 }); // Cookie hết hạn sau 7 ngày
      } else {
        throw new Error("Token not found in response");
      }

      // Nếu thành công thì hiển thị thông báo thành công
      setErrorMessage(null);
      setSuccessMessage("Login successfully");
      console.log("Token:", token);
      //Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      // Nếu server trả lỗi, hiển thị lỗi cho người dùng
      setErrorMessage(err.message);
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
          {/* ...form su dung spead operator de truyen tat ca cac props cua form  */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Hiển thị thông báo lỗi */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              {/* Hiển thị thông báo thành công */}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <Button disabled={false} size="lg" className="w-full">
                Login
              </Button>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-blue-600 hover:underline">
                  Sign up
                </Link>{" "}
                now!
              </p>
            </form>
          </Form>
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
