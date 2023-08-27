import { useState, useEffect, useRef } from "react";
import spinner from "../assets/spinner.svg";
import usePhoto from "../hooks/usePhoto";

export default function List() {
  const [query, setQuery] = useState("random");
  const [pageNumber, setPageNumber] = useState(1);
  const lastPicRef = useRef();
  const photosApiData = usePhoto(query, pageNumber);

  useEffect(() => {
    if (lastPicRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && photosApiData.maxPages !== pageNumber) {
          setPageNumber((pageNumber) => pageNumber + 1);
          lastPicRef.current = null;
          observer.disconnect();
        }
      });
      observer.observe(lastPicRef.current);
    }
  }, [photosApiData]);

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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center">
        {!photosApiData.loader &&
          photosApiData.photos.length !== 0 &&
          photosApiData.photos.map((photo, index) => {
            if (photosApiData.photos.length === index + 1) {
              return (
                <li ref={lastPicRef} key={photo.id}>
                  <img
                    className="w-full h-full object-cover border-4 border-blue-600"
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                  />
                </li>
              );
            } else {
              return (
                <li key={photo.id}>
                  <img
                    className="w-full h-full object-cover"
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                  />
                </li>
              );
            }
          })}
      </ul>
      {photosApiData.loading && !photosApiData.error.state && (
        <img className="block mx-auto" src={spinner}></img>
      )}
    </>
  );
}
