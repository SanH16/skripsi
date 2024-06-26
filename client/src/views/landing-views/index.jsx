import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { DataHeroSection } from "@/views/landing-views/constant/home-page";

import contentImg from "@/assets/content-pages.png";

export default function LandingPage() {
  useDocumentTitle("Simpeg");
  useScrollToTop();
  return <HeroSection />;
}

function HeroSection() {
  const heroSection = DataHeroSection;

  return (
    <header
      id="hero-section"
      className="relative h-[59rem] bg-green-50 pt-8 md:h-[68rem] lg:h-[45rem]"
    >
      <div className="bg-vector-header absolute h-[38rem] w-full bg-repeat-x"></div>
      <div className="static grid h-[34.6rem] grid-cols-1 px-2 sm:px-16 lg:grid-cols-2 lg:px-[5.5rem] xl:px-32 2xl:px-[10.5rem]">
        <div className="z-10 pt-5 md:w-[40rem] md:pt-20">
          <h3 id="hero-title" className="text-green-500">
            {heroSection.title}
          </h3>
          <h1 id="hero-sub-title" className="text-green-900">
            {heroSection.subs}
          </h1>
          <div className="md:w-[36rem]">
            <p
              id="hero-description"
              className="mt-8 text-sm font-medium text-grey-400 md:text-xl"
            >
              {heroSection.description}
            </p>
          </div>
          <div id="hero-button" className="mt-14 flex gap-2 md:gap-10">
            {/* <ButtonAppStore />
            <ButtonGooglePlay /> */}
          </div>
        </div>
        <div className="static">
          <div className="bg-ellipse-header absolute -bottom-0 right-0 h-[20rem] w-[40rem] md:h-[30rem] md:w-[44rem]"></div>
          <div className="bg-content-header hidden h-[38rem] w-[36rem] sm:absolute sm:-bottom-0 sm:right-0 sm:block md:-bottom-0 md:right-24 lg:absolute lg:right-14"></div>
          <img
            src={contentImg}
            alt="content"
            className="absolute -bottom-0 right-2 sm:hidden"
          />
        </div>
      </div>
    </header>
  );
}
