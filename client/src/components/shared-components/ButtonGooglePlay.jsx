import { Link } from "react-router-dom";

import logoGooglePlay from "@/assets/logo-google-play.png";

export function ButtonGooglePlay() {
  return (
    <Link
      to="https://drive.google.com/drive/folders/1zPcloKV1jKKxmaKEVK9TiTCCvtEhG7QZ"
      target="_blank"
    >
      <button
        id="button-google-play"
        className="m-1 flex rounded-md bg-black p-1 px-3 text-white hover:bg-opacity-95"
      >
        <span className="m-1 w-7">
          <img src={logoGooglePlay} alt="app-store" />
        </span>
        <span className="ps-2 text-left">
          <div className="text-[0.5rem] md:text-xs">GET IN ON</div>
          <div className="text-sm md:text-lg">Google Play</div>
        </span>
      </button>
    </Link>
  );
}
