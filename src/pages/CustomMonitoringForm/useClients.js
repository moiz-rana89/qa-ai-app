import { useCallback, useEffect, useRef, useState } from "react";
import { fetchClients } from "../../utils/clientForms";

// Loads the clients that have QA forms. Returns the list plus loading/error
// state; `retry` refetches after a failure.
export function useClients() {
  const [state, setState] = useState({
    clients: [],
    isLoading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);
  const forceRefetch = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const force = forceRefetch.current;
    forceRefetch.current = false;
    fetchClients({ force })
      .then((clients) => {
        if (!cancelled) setState({ clients, isLoading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ clients: [], isLoading: false, error });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    forceRefetch.current = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
