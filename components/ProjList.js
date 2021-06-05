import Image from "next/image";
import Link from "next/link";

import { useAppState } from "./AppContext";
import Button from "./Button";

export default function ProjList({ sorter, handleProjOpen }) {
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
        {appState.projs.map((proj) => {
          return (
            <div
              key={proj.id}
              className={`proj ${appState.proj_ids.has(proj.id) && "active"}`}
              onClick={() => handleProjOpen(proj.id)}
            >
              {/* <Link key={proj.id} href={`/project/${proj.slug}`}> */}
              {/* <a> */}
              {/* <div> */}
              <div className="proj-box">
                <div className="proj-box-title">{proj.title}</div>
                <div className="proj-box-year">{proj.year}</div>
              </div>
              {proj.images.map((ii) => (
                <div key={ii.image} className="proj-box">
                  <Image
                    // src="/favicon.ico"
                    src={ii.image}
                    width={40}
                    height={48}
                    key={ii.image}
                  />
                </div>
              ))}
              {/* </div> */}
              {/* </a> */}
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
