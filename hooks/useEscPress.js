import { useEffect } from "react";
/**
 * useEscPress
 * @param {function} action - the action to perform on pressing escape
 */
export default function useEscPress(action) {
  useEffect(() => {
    function onKeyPress(e) {
      if (e.keyCode === 27) action();
    }
    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, []);
}
