import { useState, Fragment } from "react";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

function Popover({ proj }) {
  const bestLangAvailable = () => {
    const eng = "En";
    if (proj.desc.some((ob) => ob.lang === selectedLang)) {
      // Check if selected lang is available
      return selectedLang;
    } else if (proj.desc.some((ob) => ob.lang === eng)) {
      // Check if english is available
      return eng;
    }
    // Otherwise, just use first language in data
    console.log(proj.desc[0].lang);
    return proj.desc[0].lang;
  };

  const [selectedLang, setSelectedLang] = useState(bestLangAvailable());

  const selectLang = (lang) => {
    setSelectedLang(lang);
  };

  return (
    <>
      {/* Header */}
      <p>{proj.title}</p>
      <p>{proj.year}</p>

      {/* Images */}
      <div>
        {proj.images.map((ii) => (
          <Fragment key={ii.image}>
            <Image
              src="/favicon.ico"
              //   src={ii.image}
              width={42}
              height={42}
              key={ii.image}
            />
            Caption: {ii.caption}
          </Fragment>
        ))}
      </div>

      {/* Description */}
      <div>
        {proj.desc &&
          proj.desc.map((d) => (
            <button key={d.lang} onClick={() => selectLang(d.lang)}>
              {d.lang}
            </button>
          ))}
        <p>
          {ReactHtmlParser(
            proj.desc.filter((ob) => ob.lang === bestLangAvailable())[0].text
          )}
        </p>
      </div>
    </>
  );
}

export default Popover;
