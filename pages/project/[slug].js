import { useEffect } from "react";

import { useDispatchAppState } from "../../components/AppContext";

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
  const dispatch = useDispatchAppState();

  const handleProjOpen = (proj_id) => {
    dispatch({
      type: "OPEN_PROJ",
      payload: proj_id,
    });
  };

  useEffect(() => {
    handleProjOpen(proj.id);
  }, [proj]);

  return <></>;
}
