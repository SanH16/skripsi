import { Button } from "antd";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return <HeroSection />;
}

function HeroSection() {
  return (
    <header>
      <p className="text-gray-700">Setup Tailwind</p>
      <Link to={"/abc"}>
        <Button type="primary">Click</Button>
      </Link>
    </header>
  );
}
