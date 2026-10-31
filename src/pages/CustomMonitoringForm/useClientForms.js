import { useCallback, useEffect, useRef, useState } from "react";
import { fetchClientForms } from "../../utils/clientForms";

// Loads the QA forms for one client. Returns the forms plus loading/error
// state; `retry` refetches after a failure. A falsy clientId fetches nothing.
export function useClientForms(clientId) {
  // The result is tagged with the client it belongs to, so switching clients
  // never briefly shows the previous client's forms.
  const [result, setResult] = useState({ clientId: null, forms: [], error: null });
  const [attempt, setAttempt] = useState(0);
  const forceRefetch = useRef(false);

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;
    const force = forceRefetch.current;
    forceRefetch.current = false;
    fetchClientForms(clientId, { force })
      .then((forms) => {
        if (!cancelled) setResult({ clientId, forms, error: null });
      })
      .catch((error) => {
        if (!cancelled) setResult({ clientId, forms: [], error });
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, attempt]);

  const retry = useCallback(() => {
    forceRefetch.current = true;
    setResult((prev) => ({ ...prev, clientId: null }));
    setAttempt((n) => n + 1);
  }, []);

  const isCurrent = Boolean(clientId) && result.clientId === clientId;
  return {
    forms: isCurrent ? result.forms : [],
    isLoading: Boolean(clientId) && !isCurrent,
    error: isCurrent ? result.error : null,
    retry,
  };
}
