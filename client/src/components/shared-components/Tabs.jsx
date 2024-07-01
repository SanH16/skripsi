import { useState } from "react";

export function TabsUserProfile({
  children,
  title = ["Tab 1", "Tab 2", "Tab 3"],
}) {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <section className="flex w-full text-lg">
        <div
          className={`w-1/3 ${
            activeTab === "1"
              ? "border-b-2 border-green-500 text-green-500"
              : "border-b-2 border-gray-300 text-gray-400 hover:text-green-500"
          }`}
        >
          <button
            id="doctor-tab-1"
            className="h-full w-full py-3 text-[10px] text-sm font-medium md:text-base xl:text-lg"
            onClick={() => setActiveTab("1")}
          >
            {title[0]}
          </button>
        </div>

        <div
          className={`w-1/3 ${
            activeTab === "2"
              ? "border-b-2 border-green-500 text-green-500"
              : "border-b-2 border-gray-300 text-gray-400 hover:text-green-500"
          }`}
        >
          <button
            id="doctor-tab-2"
            className="h-full w-full py-3 text-[10px] text-sm font-medium md:text-base xl:text-lg"
            onClick={() => setActiveTab("2")}
          >
            {title[1]}
          </button>
        </div>

        <div
          className={`w-1/3 ${
            activeTab === "3"
              ? "border-b-2 border-green-500 text-green-500"
              : "border-b-2 border-gray-300 text-gray-400 hover:text-green-500"
          }`}
        >
          <button
            className="h-full w-full py-3 text-[10px] text-sm font-medium md:text-base xl:text-lg"
            onClick={() => setActiveTab("3")}
          >
            {title[2]}
          </button>
        </div>
      </section>

      {activeTab === "1"
        ? children[0]
        : activeTab === "2"
          ? children[1]
          : children[2]}
    </>
  );
}
