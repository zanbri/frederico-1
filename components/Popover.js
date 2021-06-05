import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { BiPlus, BiMinus, BiX } from "react-icons/bi";

import ReactHtmlParser from "react-html-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Draggable from "react-draggable";

import useEscPress from "../hooks/useEscPress";
import { useAppState, useDispatchAppState } from "./AppContext";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Popover({ proj_id }) {
  const [selectedLang, setSelectedLang] = useState("En");
  const dispatch = useDispatchAppState();
  const appState = useAppState();
  const router = useRouter();
  const proj = appState.projs.find((x) => x.id === proj_id);

  const bestLangAvailable = () => {
    if (!proj.desc.some((ob) => ob.lang === selectedLang)) {
      setSelectedLang(proj.desc[0].lang);
    }
    console.log("Best available will return: ", selectedLang);
    return selectedLang;
  };

  const handleSetActive = () => {
    // Send dispatch to update active project id
    if (proj_id !== appState.active_id) {
      dispatch({
        type: "ACTIVE_ID",
        payload: proj_id,
      });

      const active_proj_slug = appState.projs.find(
        (x) => x.id === proj_id
      ).slug;
      console.log("next active slug from set active: ", active_proj_slug);
      router.push(`/project/${active_proj_slug}`);
    }
  };

  const handleSetMaximize = () => {
    if (proj_id !== appState.maximized_id) {
      dispatch({
        type: "MAXIMIZE",
        payload: proj_id,
      });
    } else {
      dispatch({
        type: "MAXIMIZE",
        payload: null,
      });
    }
  };

  const handleProjClose = () => {
    // Activate this project before closing it
    if (proj_id !== appState.active_id) {
      dispatch({
        type: "ACTIVE_ID",
        payload: proj_id,
      });
    }

    // Send dispatch to close project
    dispatch({
      type: "CLOSE_PROJ",
      payload: proj_id,
    });

    // Reset maximized id
    dispatch({
      type: "MAXIMIZE",
      payload: null,
    });

    // Change URL to next active popover, if any
    if (appState.proj_ids.size > 0) {
      const next_active_id = appState.proj_ids.values().next().value;
      var assert = require("assert");
      assert(
        next_active_id !== proj_id,
        "The next_active_id shouldn't be in the proj_ids set anymore."
      );

      const active_proj_slug = appState.projs.find(
        (x) => x.id === next_active_id
      ).slug;
      console.log("next active slug: ", active_proj_slug);
      router.push(`/project/${active_proj_slug}`);

      // Send dispatch to update active project id
      dispatch({
        type: "ACTIVE_ID",
        payload: next_active_id,
      });
    } else {
      // Send dispatch to update active project id
      dispatch({
        type: "ACTIVE_ID",
        payload: null,
      });
      router.push("/");
    }
  };

  useEscPress(() => {
    console.log("Esc pressed! Active id: ", appState.active_id);
    handleProjClose();
  });

  return (
    <Draggable
      defaultPosition={{
        x: getRandomInt(0, 400),
        y: getRandomInt(-200, 200),
      }}
    >
      <div
        className={`popover ${appState.active_id === proj_id ? "active" : ""}
        ${
          appState.maximized_id === proj_id && appState.active_id === proj_id
            ? "maximized"
            : ""
        }`}
        onClick={() => handleSetActive()}
      >
        {/* Header */}
        <div className="popover__btn_close-popover">
          <BiX
            onClick={() => {
              // Prevent the closing button from working if this project is not active
              appState.active_id === proj_id ? handleProjClose(proj.id) : {};
            }}
          />
          {appState.maximized_id !== proj_id ? (
            <BiPlus
              onClick={() => {
                // Prevent the closing button from working if this project is not active
                appState.active_id === proj_id ? handleSetMaximize() : {};
              }}
            />
          ) : (
            <BiMinus
              onClick={() => {
                // Prevent the closing button from working if this project is not active
                appState.active_id === proj_id ? handleSetMaximize() : {};
              }}
            />
          )}
        </div>
        <h3 className="popover__title">{proj.title}</h3>
        <p className="popover__year">{proj.year}</p>

        {/* Carousel */}
        <Carousel
          autoplay={false}
          centerMode={true}
          centerSlidePercentage={100}
          infiniteLoop={true}
          showStatus={false}
          showIndicators={false}
          // showArrows={false}
          showThumbs={false}
          useKeyboardArrows={true}
          // width={"80%"}
          // dynamicHeight={true}
        >
          {proj.images.map((ii, index) => (
            <div key={ii}>
              <Image
                // src="/favicon.ico"
                src={ii.image}
                width={400}
                height={400}
                // layout="fill"
                // layout="responsive"
                // width="100%"
                // height="100%"
                // style={{ objectFit: "cover" }}
                key={ii.image}
              />
              <p className="popover__slide_caption">__Caption__ {ii.caption}</p>
            </div>
          ))}
        </Carousel>

        {/* Description */}
        {appState.maximized_id !== proj_id && (
          <div className="popover__desc">
            {proj.desc &&
              proj.desc.map((d) => (
                <button
                  className={`desc-lang ${
                    d.lang === selectedLang ? "active" : ""
                  }`}
                  key={d.lang}
                  onClick={() => setSelectedLang(d.lang)}
                >
                  {d.lang.toUpperCase()}
                </button>
              ))}
            <div className="popover__desc_text">
              {ReactHtmlParser(
                proj.desc.filter((ob) => ob.lang === bestLangAvailable())[0]
                  .text
              )}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
