import Image from "next/image";
import Link from "next/link";

import Button from "./Button";

export default function ProjList({ projs, sorter }) {
  return (
    <div>
      <div>
        <Button name="by date" onClickHandler={sorter} type="year" />
        <Button name="by title" onClickHandler={sorter} type="title" />
        <Button name="random" onClickHandler={sorter} type="random" />
      </div>
      <div>
        <Button name="all" onClickHandler={sorter} type="random" />
        <Button name="azul" onClickHandler={sorter} type="random" />
        <Button name="teatro" onClickHandler={sorter} type="random" />
      </div>
      {projs.map((proj) => {
        return (
          <Link href={`/project/${proj.slug}`} key={proj.id}>
            <a>
              {proj.title} {proj.year}
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
