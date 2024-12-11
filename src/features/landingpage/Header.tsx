/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/sign-in");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };
  return (
    <>
      <div className="grotesk mb-0 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-6 ">
        <div className="mt-4 inline-block pb-4 pl-8">
          <a
            href="/"
            className="inline-flex items-center text-3xl font-bold text-black"
          >
            <img
              src="/images/atlassian_jira.png"
              alt="Logo"
              className="w-8 h-8 mr-2"
            />
            Jira
          </a>
        </div>

        <div className="flex items-center">
          <div className="hidden py-1 text-right xl:inline-block">
            <Button variant="ghost" onClick={handleLoginClick}>
              Log in
            </Button>
            <Button className="ml-4" onClick={handleSignUpClick}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
