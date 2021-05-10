import Image from "next/image";
import Link from "next/link";

import Button from "./Button";

export default function ProjList({ projs, sorter }) {
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
      {projs.map((proj) => {
        return (
          <Link className="proj" href={`/project/${proj.slug}`} key={proj.id}>
            <a>
              <div className="proj-box">
                <div className="proj-title">{proj.title}</div>
                <div className="proj-year">{proj.year}</div>
              </div>
              {proj.images.map((ii) => (
                <Image
                  src="/favicon.ico"
                  // src={ii.image}
                  width={32}
                  height={32}
                  key={ii.image}
                />
              ))}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
