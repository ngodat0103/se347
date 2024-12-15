"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function ThreeDCardDemo() {
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push("/sign-up");
  };
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          &quot;Before, we found collaboration challenging, but now with Jira, we
          meet all your work needs.&quot;
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          VietDuc-CEO
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/images/landingpage/earth.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Button variant="ghost" className="ml-4" onClick={handleSignUpClick}>
            Sign up
          </Button>
        </div>
      </CardBody>
    </CardContainer>
  );
}
