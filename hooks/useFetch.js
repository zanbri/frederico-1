import { useState, useEffect } from "react";
/**
 * useFetch
 * @param {string} url - the URL to fetch data from
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for resource");
        }
        return res.json();
      })
      .then((data) => {
        const projs = data.map((proj) => {
          return {
            id: proj.id,
            title: proj.title.rendered,
            year: proj.acf.year,
            images: proj.acf.images,
            desc: proj.acf.content,
            slug: proj.slug,
          };
        });
        setData(projs);
        setError(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url]);
  return { data, error };
}

export default useFetch;
