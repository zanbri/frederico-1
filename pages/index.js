import { useEffect } from "react";

import { useDispatchAppState } from "../components/AppContext";

export default function Home() {
  const dispatch = useDispatchAppState();

  const handleProjClear = () => {
    dispatch({
      type: "CLEAR_PROJS",
    });
  };

  useEffect(() => {
    handleProjClear();
  }, []);

  return <></>;
}
