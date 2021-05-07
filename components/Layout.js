import Head from "next/head";
import { useRef, useEffect, useState } from "react";

import Header from "./Header";
import ProjList from "./ProjList";

import useFetch from "../hooks/useFetch";

function useDidUpdate(callback, deps) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
}

export default function Layout({ children }) {
  const [projs, setProjs] = useState(null);
  const [activeProj, setActiveProj] = useState(null);
  const [sortToggle, setSortToggle] = useState(false);

  // Sort
  const sortData = (type) => {
    let sorted = [];
    if (type === "year") {
      sorted = [...projs].sort((a, b) => a[type] - b[type]);
    } else if (type === "random") {
      sorted = [...projs].sort(() => 0.5 - Math.random()); // not best method for random shuffle, but good enough
    } else {
      sorted = [...projs].sort((a, b) => a[type].localeCompare(b[type]));
    }
    if (sortToggle) {
      sorted.reverse();
    }
    setSortToggle(!sortToggle);
    setProjs(sorted);
  };

  const { data: rawProjects, error } = useFetch(
    // "http://localhost:8000/projects"
    "https://frederico.funfuns.studio/wp-json/wp/v2/posts"
  );

  useEffect(() => {
    setProjs(rawProjects);
  }, [rawProjects]);

  return (
    <>
      <div>
        <Head>
          <title>Frederico Ramos Lopes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {error && <div>{error}</div>}
        {projs && <ProjList projs={projs} sorter={sortData} />}
      </div>
      {children}
    </>
  );
}
