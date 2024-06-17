import { Button } from "antd";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return <HeroSection />;
}

function HeroSection() {
  return (
    <header>
      <p className="text-gray-700">Setup Tailwind</p>
      <div className="mx-[20px]">
        <Link to={"/abc"}>
          <Button type="primary">Click</Button>
        </Link>
        <Link to={"/dashboard"}>
          <Button type="primary" className="ms-[20px]">
            Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
}
