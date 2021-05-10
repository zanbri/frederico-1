import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";

import ReactHtmlParser from "react-html-parser";

import useFetch from "../hooks/useFetch";
import { useAppState, useDispatchAppState } from "./AppContext";

import ProjList from "./ProjList";

export default function Layout({ children }) {
  const [projs, setProjs] = useState(null);
  const [sortToggle, setSortToggle] = useState(false);
  const [selectedLang, setSelectedLang] = useState("En");

  const appState = useAppState();
  const dispatch = useDispatchAppState();

  const bestLangAvailable = (proj) => {
    const eng = "En";
    if (proj.desc.some((ob) => ob.lang === selectedLang)) {
      // Check if selected lang is available
      return selectedLang;
    } else if (proj.desc.some((ob) => ob.lang === eng)) {
      // Check if english is available
      return eng;
    }
    // Otherwise, just use first language in data
    return proj.desc[0].lang;
  };

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

    dispatch({
      type: "SORT",
      payload: type,
    });
  };

  const { data: rawProjects, error } = useFetch(
    "https://frederico.funfuns.studio/wp-json/wp/v2/posts"
  );

  useEffect(() => {
    setProjs(rawProjects);
  }, [rawProjects]);

  const selectLang = (lang) => {
    setSelectedLang(lang);
  };

  const handleProjClose = (proj_id) => {
    dispatch({
      type: "CLOSE_PROJ",
      payload: proj_id,
    });
  };

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

        {/* Popovers */}
        {projs &&
          Array.from(appState.proj_ids).map((id) => {
            const proj = projs.find((x) => x.id === id);
            return (
              <div key={id}>
                {/* Header */}
                <div className="header">
                  <button
                    className="close-popover"
                    onClick={() => handleProjClose(proj.id)}
                  >
                    X
                  </button>
                  <p className="title">{proj.title}</p>
                  <p className="year">{proj.year}</p>
                </div>

                {/* Images */}
                <div className="images">
                  {proj.images.map((ii) => (
                    <Fragment key={ii.image}>
                      <Image
                        src="/favicon.ico"
                        // src={ii.image}
                        width={32}
                        height={32}
                        key={ii.image}
                      />
                      Caption: {ii.caption}
                    </Fragment>
                  ))}
                </div>

                {/* Description */}
                <div className="desc">
                  {proj.desc &&
                    proj.desc.map((d) => (
                      <button
                        className={`desc-lang ${
                          d.lang === bestLangAvailable(proj) && "active"
                        }`}
                        key={d.lang}
                        onClick={() => selectLang(d.lang)}
                      >
                        {d.lang}
                      </button>
                    ))}
                  <div className="desc-text">
                    {ReactHtmlParser(
                      proj.desc.filter(
                        (ob) => ob.lang === bestLangAvailable(proj)
                      )[0].text
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Children */}
      {children}
    </>
  );
}
