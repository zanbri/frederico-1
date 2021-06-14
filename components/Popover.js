import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { BiPlus, BiMinus, BiX } from "react-icons/bi";

import ReactHtmlParser from "react-html-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Draggable from "react-draggable";

import useEscPress from "../hooks/useEscPress";
import useMediaQuery from "../hooks/useMediaQuery";
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

  const is_mobile = useMediaQuery(768);

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

  const handleProjClose = (proj__id) => {
    // Activate this project before closing it
    if (proj__id !== appState.active_id) {
      dispatch({
        type: "ACTIVE_ID",
        payload: proj__id,
      });
    } else {
      // Send dispatch to close project
      dispatch({
        type: "CLOSE_PROJ",
        payload: proj__id,
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
          next_active_id !== proj__id,
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
    }
  };

  useEscPress(() => {
    console.log("Esc pressed! Active id: ", appState.active_id);
    handleProjClose(appState.active_id);
  });

  const content = (
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
      <div className="popover__topright_icons">
        <BiX
          className="icon-button"
          onClick={() => {
            // Prevent the closing button from working if this project is not active
            appState.active_id === proj_id ? handleProjClose(proj.id) : {};
          }}
        />
        {!is_mobile &&
          (appState.maximized_id !== proj_id ? (
            <BiPlus
              className="icon-button"
              onClick={() => {
                // Prevent the closing button from working if this project is not active
                appState.active_id === proj_id ? handleSetMaximize() : {};
              }}
            />
          ) : (
            <BiMinus
              className="icon-button"
              onClick={() => {
                // Prevent the closing button from working if this project is not active
                appState.active_id === proj_id ? handleSetMaximize() : {};
              }}
            />
          ))}
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
        showThumbs={false}
        useKeyboardArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <div
            className="carousel__arrow arrow_prev"
            type="button"
            onClick={onClickHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="svg_arrow"
                d="M13.939 4.939L6.879 12 13.939 19.061 16.061 16.939 11.121 12 16.061 7.061z"
              ></path>
            </svg>
          </div>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <div
            className="carousel__arrow arrow_next"
            type="button"
            onClick={onClickHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="svg_arrow"
                d="M10.061 19.061L17.121 12 10.061 4.939 7.939 7.061 12.879 12 7.939 16.939z"
              ></path>
            </svg>
          </div>
        )}
      >
        {proj.images.map((ii, index) => (
          <div
            key={ii}
            className={`popover__carousel ${
              appState.maximized_id === proj_id ? "maximized" : ""
            }`}
          >
            <div
              className={`popover__image ${
                appState.maximized_id === proj_id ? "maximized" : ""
              }`}
            >
              <Image
                className="image"
                key={ii.image}
                // src="/favicon.ico"
                src={ii.image}
                layout="fill"
                objectFit={"contain"}
              />
            </div>
            <p className="popover__image_caption">
              {`Lorem ipsum dolor . ${ii.caption}`}
            </p>
          </div>
        ))}
      </Carousel>

      {/* Description */}
      {appState.maximized_id !== proj_id && (
        <>
          <div>
            {proj.desc &&
              proj.desc.map((d) => (
                <span key={d.lang}>
                  <button
                    className={`popover__desc_btn ${
                      d.lang === selectedLang ? "active" : ""
                    }`}
                    onClick={() => setSelectedLang(d.lang)}
                  >
                    {d.lang.toUpperCase()}
                  </button>
                </span>
              ))}
          </div>
          {proj.desc && (
            <div className="popover__desc">
              <div className="popover__desc_text">
                {ReactHtmlParser(
                  proj.desc.filter((ob) => ob.lang === bestLangAvailable())[0]
                    .text
                )}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            deleniti consequuntur harum? Nisi alias in aperiam repellat, quis
            perspiciatis doloribus dicta ad beatae porro sit aspernatur qui
            ducimus, quam magnam hic cupiditate! Consequatur voluptate, quaerat
            explicabo commodi dolor alias magni aperiam? Repudiandae quibusdam,
            recusandae accusantium illum atque similique dolores ipsam aliquid
            non aspernatur libero animi autem magni officiis, iusto praesentium,
            dolorem tempore quasi fugit nemo mollitia maiores possimus! Quo sed
            illum consequuntur obcaecati facere qui porro. Omnis earum
            architecto beatae soluta asperiores atque voluptates ducimus culpa
            est incidunt laudantium, magni eum optio enim. Dolorum tempora
            blanditiis vero necessitatibus at ipsam. */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return is_mobile || appState.maximized_id === proj_id ? (
    <div>{content}</div>
  ) : (
    <Draggable
      defaultPosition={{
        x: getRandomInt(0, 400),
        y: getRandomInt(0, 200),
      }}
      position={appState.maximized_id === proj_id ? { x: 0, y: 0 } : null}
    >
      {content}
    </Draggable>
  );
}
