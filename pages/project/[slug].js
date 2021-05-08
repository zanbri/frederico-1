import { useState, useEffect, Fragment } from "react";
import Image from "next/image";

import ReactHtmlParser from "react-html-parser";

export const getStaticPaths = async () => {
  //   const res = await fetch("http://localhost:8000/projects");
  const res = await fetch(
    "https://frederico.funfuns.studio/wp-json/wp/v2/posts"
  );
  const data = await res.json();

  const paths = data.map((proj) => {
    return {
      params: {
        slug: proj.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const res = await fetch(
    "https://frederico.funfuns.studio/wp-json/wp/v2/posts?slug=" + slug
  );
  const data = await res.json();

  return {
    props: {
      proj: data[0],
    },
  };
};

export default function Popover({ proj }) {
  const [selectedLang, setSelectedLang] = useState(null);

  const bestLangAvailable = () => {
    const eng = "En";
    if (proj.acf.content.some((ob) => ob.lang === selectedLang)) {
      // Check if selected lang is available
      return selectedLang;
    } else if (proj.acf.content.some((ob) => ob.lang === eng)) {
      // Check if english is available
      return eng;
    }
    // Otherwise, just use first language in data
    console.log(proj.desc[0].lang);
    return proj.desc[0].lang;
  };

  useEffect(() => {
    setSelectedLang(bestLangAvailable());
  }, []);

  const selectLang = (lang) => {
    setSelectedLang(lang);
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <p className="title">{proj.title.rendered}</p>
        <p className="year">{proj.acf.year}</p>
      </div>

      {/* Images */}
      <div className="images">
        {proj.acf.images.map((ii) => (
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
        {proj.acf.content &&
          proj.acf.content.map((d) => (
            <button
              className="desc-lang"
              key={d.lang}
              onClick={() => selectLang(d.lang)}
            >
              {d.lang}
            </button>
          ))}
        <div className="desc-text">
          {ReactHtmlParser(
            proj.acf.content.filter((ob) => ob.lang === bestLangAvailable())[0]
              .text
          )}
        </div>
      </div>
    </>
  );
}
