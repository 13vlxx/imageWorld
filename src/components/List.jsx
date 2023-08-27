import { useState, useEffect, useRef } from "react";
import spinner from "../assets/spinner.svg";
import usePhoto from "../hooks/usePhoto";

export default function List() {
  const [query, setQuery] = useState("random");
  const [pageNumber, setPageNumber] = useState(1);

  const photosApiData = usePhoto(query, pageNumber);
  console.log(photosApiData);

  return (
    <>
      <h1 className="text-4xl font-semibold">imageWorld</h1>
      <form>
        <label className="block mb-4" htmlFor="search">
          Look for images...
        </label>
        <input
          className="w-full mb-14 text-slate-800 py-3 px-2 outline-gray-500 rounded border border-slate-400 "
          type="text"
          placeholder="Look for something..."
          id="search"
        />
      </form>
    </>
  );
}
