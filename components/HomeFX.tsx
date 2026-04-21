"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import EntryGate from "@/components/EntryGate";

function subscribeStorage(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export default function HomeFX() {
  const gateOpened = useSyncExternalStore(
    subscribeStorage,
    () => sessionStorage.getItem("gate-opened") === "1",
    () => true
  );

  const [dismissed, setDismissed] = useState(false);
  const showEntry = !gateOpened && !dismissed;

  const complete = useCallback(() => {
    sessionStorage.setItem("gate-opened", "1");
    setDismissed(true);
  }, []);

  return (
    <>
      {/* Ambient overlay (CSS-only) */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <div className="speed-lines speed-lines-animated opacity-60" />
      </div>

      {showEntry && <EntryGate onComplete={complete} />}
    </>
  );
}

