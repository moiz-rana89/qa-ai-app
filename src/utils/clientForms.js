import Api from "../reduxStore/lib/api";

// Client-specific QA forms are served by the backend. Forms are cached per
// client id for a few minutes so re-selecting a client doesn't refetch.
const CACHE_TTL_MS = 5 * 60 * 1000;
const formsCache = new Map(); // clientId -> { promise, fetchedAt }

export function fetchClientForms(clientId, { force = false } = {}) {
  const key = String(clientId);
  const cached = formsCache.get(key);
  if (!force && cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.promise;
  }

  const promise = Api.get("/qa_ai_new/dynamic_client_forms", {
    client_id: clientId,
  })
    .then((resp) => {
      if (!Array.isArray(resp?.data)) {
        throw new Error("Unexpected response while loading client forms");
      }
      return resp.data;
    })
    .catch((err) => {
      // Don't keep failures around — the next call should hit the API again.
      if (formsCache.get(key)?.promise === promise) formsCache.delete(key);
      throw err;
    });

  formsCache.set(key, { promise, fetchedAt: Date.now() });
  return promise;
}
