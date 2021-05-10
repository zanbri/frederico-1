import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { useAppState } from "./AppContext";
import Button from "./Button";

export default function ProjList({ projs, sorter }) {
  const appState = useAppState();

  return (
    <div className="proj-list">
      <div className="sort-btn">
        <Button name="by date" onClickHandler={sorter} type="year" />
        <Button name="by title" onClickHandler={sorter} type="title" />
        <Button name="random" onClickHandler={sorter} type="random" />
      </div>
      <div className="filter-btn">
        <Button name="all" onClickHandler={sorter} type="random" />
        <Button name="azul" onClickHandler={sorter} type="random" />
        <Button name="teatro" onClickHandler={sorter} type="random" />
      </div>
      <div className="projs">
        {projs.map((proj) => {
          return (
            <span
              key={proj.id}
              className={`proj ${appState.proj_ids.has(proj.id) && "active"}`}
            >
              <Link href={`/project/${proj.slug}`}>
                <a>
                  <span className="proj-box">
                    <div className="title">
                      <div className="proj-title">{proj.title}</div>
                      <div className="proj-year">{proj.year}</div>
                    </div>
                  </span>
                  {proj.images.map((ii) => (
                    <span key={ii.image} className="proj-box">
                      <Image
                        // src="/favicon.ico"
                        src={ii.image}
                        width={40}
                        height={48}
                        key={ii.image}
                      />
                    </span>
                  ))}
                  <span className="proj-box">
                    <div className="proj-end"></div>
                  </span>
                </a>
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
