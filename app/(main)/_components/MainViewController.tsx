"use client"
import { RefObject, useEffect } from "react";
import { SIDE_VIEWS, useSideStore } from "./side/sideStore";

function MainViewController({
  ref,
  viewId,
  rootMargin = "-30% 0px -90% 0px",
}: {
  ref: RefObject<HTMLElement | null>;
  viewId: (typeof SIDE_VIEWS)[keyof typeof SIDE_VIEWS];
  rootMargin?: string;
}) {
  const { setCurrentView } = useSideStore();

  useEffect(() => {
    const refCurrent = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentView(viewId);
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      }
    );

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [viewId, rootMargin, ref, setCurrentView]);
  return <></>;
}

export default MainViewController;
