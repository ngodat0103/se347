import { ImageCard } from "@/components/ImageCard";
import { ChangeSlider } from "@/components/changeslider";
export function Body() {
  return (
    <div className="grotesk max-w-8xl mx-auto">
      <h2 className="flex justify-center items-center lg:text-[4.2em] text-3xl font-bold leading-none text-black inline-block mb-12 pt-14">
        Great outcomes start with Jira
      </h2>
      <div className="flex justify-center items-center">
        <ImageCard />
      </div>
    </div>
  );
}
