import { useRef, useEffect } from "react";

export function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    if (title === "Simpeg") {
      document.title = "Simpeg";
    } else document.title = `${title} | Simpeg`;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [],
  );
}
