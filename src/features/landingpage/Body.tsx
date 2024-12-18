import { ThreeDCardDemo } from "@/components/card";
import { AppleCardsCarouselDemo } from "@/components/AppleCardsCarouselDemo";
import { HeroParallaxPage } from "@/components/HeroParallaxPage";
export function Body() {
  return (
    <div className="grotesk max-w-8xl mx-auto">
      <h2 className=" flex justify-center items-center lg:text-[4.2em] text-3xl font-bold leading-none text-black mb-12 pt-14">
        Great outcomes start with Jira
      </h2>
      <HeroParallaxPage />
      <div className="flex justify-center items-center">
        <div className=" h-3/5">
          <AppleCardsCarouselDemo />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="flex-1 max-w-screen-md ml-20 mr-20">
          Connect with our 4.5M+ community members Ask questions, give product
          feedback, and connect with our team and other users to learn best
          practices. From events and forums, to curated learning paths,
          you&apos;re never alone when you are an Atlassian customer.
        </p>
        <ThreeDCardDemo />
      </div>
    </div>
  );
}
