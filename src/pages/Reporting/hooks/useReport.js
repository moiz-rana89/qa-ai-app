import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Wraps a redux thunk-returning fetch (e.g. getHubDeskSummary) with
// loading/error/data state and AbortController-based cancellation, so a
// slow response can't land after a newer one and overwrite it — nothing
// else in this codebase handles that race today (confirmed via research),
// so this is new.
//
// `thunk` — the imported action creator, e.g. getAttendanceSummary.
// `params` — the params object to pass to the thunk.
// `active` — set false to skip fetching entirely (e.g. scope is blocked).
// `deps` — dependency array controlling when to refetch (caller-supplied,
// since `params` is a fresh object every render).
export default function useReport(thunk, params, active, deps) {
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
