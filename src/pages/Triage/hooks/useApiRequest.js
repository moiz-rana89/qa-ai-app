import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Same shape/behavior as the Reporting and QA Form Coverage modules'
// own copies — kept local to this feature rather than a cross-feature
// import, matching the app's per-feature-hooks convention. Wraps a
// redux thunk-returning fetch with loading/error/data state and
// AbortController-based cancellation.
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
