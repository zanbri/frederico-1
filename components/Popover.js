import { useState, Fragment } from "react";
import Image from "next/image";

import ReactHtmlParser from "react-html-parser";

import { useDispatchAppState } from "./AppContext";

export default function Popover({ proj }) {
  const [selectedLang, setSelectedLang] = useState("En");
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
    <div key={proj.id}>
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
            proj.desc.filter((ob) => ob.lang === bestLangAvailable(proj))[0]
              .text
          )}
        </div>
      </div>
    </div>
  );
}
