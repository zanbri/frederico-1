import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import ProjList from "./ProjList";

import useFetch from "../hooks/useFetch";

export default function Layout({ children }) {
  const [projs, setProjs] = useState(null);
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
    "https://frederico.funfuns.studio/wp-json/wp/v2/posts"
  );

  useEffect(() => {
    setProjs(rawProjects);
  }, [rawProjects]);

  return (
    <>
      <div className="layout">
        {/* Window Header */}
        <Head>
          <title>Frederico Ramos Lopes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Header */}
        <div className="header">
          <Link href="/">
            <h1 className="title">Frederico Ramos Lopes</h1>
          </Link>
          <div className="blurb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            labore consequuntur mollitia aspernatur pariatur, quidem ducimus
            blanditiis velit quod quis, doloremque ipsa, enim impedit provident
            nostrum ab ad adipisci natus.
          </div>
        </div>

        {/* Errors */}
        {error && <div className="error">{error}</div>}

        {/* Projects */}
        {projs && <ProjList projs={projs} sorter={sortData} />}
      </div>
      {children}
    </>
  );
}
