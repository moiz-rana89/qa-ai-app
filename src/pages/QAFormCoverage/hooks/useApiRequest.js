import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Same shape/behavior as the Reporting module's useReport hook — kept as
// its own local copy rather than a cross-feature import, matching how
// each page area in this app owns its own small hooks. Wraps a redux
// thunk-returning fetch with loading/error/data state and
// AbortController-based cancellation so a slow response can't land after
// a newer one and overwrite it.
//
// `thunk` — the imported action creator, e.g. getClientsCoverage.
// `params` — the params object to pass to the thunk.
// `active` — set false to skip fetching entirely.
// `deps` — dependency array controlling when to refetch (caller-supplied,
// since `params` is a fresh object every render).
export default function useApiRequest(thunk, params, active, deps) {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    dispatch(
      thunk(
        params,
        (success, result) => {
          setLoading(false);
          if (success) {
            setData(result);
          } else if (result?.name !== "AbortError") {
            setError(result);
            setData(null);
          }
        },
        controller.signal
      )
    );
  };

  useEffect(() => {
    if (active === false) return undefined;
    run();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: run };
}
