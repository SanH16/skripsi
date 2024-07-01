import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import {
  DataHeroSection,
  DataAboutSection,
  DataServiceSection,
  DataCtaUser,
} from "@/views/landing-views/constant/home-page";

import { ButtonAppStore } from "@/components/shared-components/ButtonAppStore";
import { ButtonGooglePlay } from "@/components/shared-components/ButtonGooglePlay";

import contentImg from "@/assets/content-pages.png";
import handPhone from "@/assets/handphone.png";
// import { ListingLowongan } from "@/components/shared-components/ListingLowongan";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BannerDownload } from "@/components/shared-components/BannerDownload";
import { ListingLowongan } from "../app-views/rekrutmen/components/ListLowongan";

// import { ListingLowongan } from "@/app-views/rekrutmen/components/ListLowongan";

export default function LandingPage() {
  useDocumentTitle("Radenmat");
  useScrollToTop();
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LowonganListsPage />
      <DownloadSection />
      <JoinSection />
    </>
  );
}

function HeroSection() {
  const heroSection = DataHeroSection;

  return (
    <header
      id="hero-section"
      className="relative h-[59rem] bg-green-50 pt-8 md:h-[68rem] lg:h-[45rem]"
    >
      <div className="absolute h-[38rem] w-full bg-vector-header bg-repeat-x"></div>
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
            <ButtonAppStore />
            <ButtonGooglePlay />
          </div>
        </div>
        <div className="static">
          <div className="absolute -bottom-0 right-0 h-[20rem] w-[40rem] bg-ellipse-header md:h-[30rem] md:w-[44rem]"></div>
          <div className="hidden h-[38rem] w-[36rem] bg-content-header sm:absolute sm:-bottom-0 sm:right-0 sm:block md:-bottom-0 md:right-24 lg:absolute lg:right-14"></div>
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

function AboutSection() {
  const aboutSection = DataAboutSection;

  return (
    <section
      id="tentang-kami"
      className="h-auto bg-green-50 p-2 py-14 sm:px-12 md:relative lg:px-[5.5rem] xl:px-32 2xl:px-[10.5rem]"
    >
      <div className="absolute hidden h-[21.9rem] w-[24rem] lg:bottom-0 lg:left-16 lg:block">
        <img src={handPhone} alt="handphone" />
      </div>
      <div className="lg:ms-[20rem] lg:mt-10 lg:text-justify">
        <h2 id="about-title" className="text-2xl text-green-900 sm:text-4xl">
          {aboutSection.title}
        </h2>
        <p
          id="about-description"
          className="mt-5 py-2 text-sm font-medium text-grey-400 sm:text-base"
        >
          {aboutSection.description}
        </p>
      </div>
    </section>
  );
}

function LowonganListsPage() {
  const serviceLists = DataServiceSection;

  return (
    <>
      <section
        id="lowongan-lists-page"
        className="h-auto bg-grey-10 p-2 py-8 sm:px-12 lg:px-[5.5rem] xl:px-32 2xl:px-[10.5rem]"
      >
        <h2
          id="services-title"
          className="my-5 mb-[2.5rem] text-center text-2xl text-green-900 md:text-4xl"
        >
          {serviceLists.title}
        </h2>

        <ListingLowongan />
      </section>
    </>
  );
}

function DownloadSection() {
  return (
    <section className="my-5 h-auto p-2 py-8 sm:px-12 md:relative lg:px-[5.5rem] xl:px-36 2xl:px-[10.5rem]">
      <BannerDownload />
    </section>
  );
}

function JoinSection() {
  const JoinSection = DataCtaUser;
  return (
    <section
      id="cta-user"
      className="base-container h-auto w-auto bg-green-100"
    >
      <div className="py-[3.25rem] md:text-center">
        <h2 id="cta-user-title" className="text-green-900">
          {JoinSection.title}
        </h2>
        <p
          id="cta-user-description"
          className="mt-1 text-sm md:text-base lg:text-lg xl:text-xl"
        >
          {JoinSection.subs}
        </p>
        <div className="mt-6 flex text-white md:justify-center">
          <Link id="link-cta-user" to="/login">
            <ButtonCtaJoin />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ButtonCtaJoin() {
  return (
    <Button
      id="button-cta-user"
      type="primary"
      className="flex items-center px-8 py-6 text-base font-semibold"
    >
      Pelajari Lebih Lanjut
      <span className="ms-2 text-base text-white">
        <FaArrowRight />
      </span>
    </Button>
  );
}
