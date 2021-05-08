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
          // TODO HERE I need to replace Link with a button that then updates the Context API obj by adding the proj id (or slug), then I also need to change the [slug].js to be empty (i think), and move the popover info to a new component, and in the layout, i loop through all projects, and see which proj popovers should be shown (by using the state in the context api). This way, I should be able to see multiple slugs at once (ugh..).
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
