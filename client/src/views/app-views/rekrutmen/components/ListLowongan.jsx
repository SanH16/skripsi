import { BsSearch } from "react-icons/bs";

import { ListingLowongan } from "@/components/shared-components/ListingLowongan";

export default function ListLowongan() {
  return (
    <>
      <section id="search-lowongan">
        <div className="relative mb-6 focus:bg-black">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 sm:ps-8">
            <BsSearch className="text-gray-400" />
          </div>
          <input
            id="search-bar-forum-1"
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm focus:outline-green-500 sm:p-5 sm:ps-14"
            placeholder="Cari kata kunci"
            name="search"
          />
        </div>
      </section>

      <ListingLowongan />
    </>
  );
}
