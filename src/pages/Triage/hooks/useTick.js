import { useEffect, useState } from "react";

// Forces a re-render every `intervalMs` — used to keep countdown labels
// (formatCountdown) live without re-fetching data. One shared ticker per
// mounted feed/card tree is enough; this hook just returns a changing
// value the caller can put in a render dependency.
export default function useTick(intervalMs = 60000) {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}
