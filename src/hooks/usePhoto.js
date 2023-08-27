import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function usePhoto(querySearch, pageIndex) {
  const [error, setError] = useState({
    msg: "",
    state: false,
  });
  const [photos, setPhotos] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${
        import.meta.env.VITE_UNSPLASH_KEY
      }`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPhotos((state) => [...state, ...data.results]);
        setMaxPages(data.total_pages);
        setLoading(false);
      });
  }, [querySearch, pageIndex]);

  return { error, photos, maxPages, loading };
}
