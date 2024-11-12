"use client";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-3/4 py-16">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your Jira
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/images/2.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "PRODUCT AND ISSUA TRACKING",
    title: "Software Development",
    src: "/images/landingpage/deve.jpg",
    content: <DummyContent />,
  },
  {
    category: "PLAN AND LAUNCH CAMPAIGNS",
    title: "Marketing and Sales",
    src: "/images/landingpage/marketing.jpg",
    content: <DummyContent />,
  },
  {
    category: "MANAGE AND TRACK REQUESTS",
    title: "IT support services",
    src: "/images/landingpage/it.jpg",
    content: <DummyContent />,
  },

  {
    category: "BUILD CREATIVE WORKFLOWS",
    title: "Design",
    src: "/images/landingpage/design.jpg",
    content: <DummyContent />,
  },
  {
    category: "CREATE INTAKE PROCESS",
    title: "Operations",
    src: "/images/landingpage/ope.jpg",
    content: <DummyContent />,
  },
];
