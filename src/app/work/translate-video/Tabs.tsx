"use client";

import { useState } from "react";
import { BeforeAfterTabs, type BeforeAfter } from "@/components/case-study/BeforeAfterTabs";

/**
 * Client boundary for the Before/After toggle, so the case study page itself
 * stays a server component.
 */
export function TranslateVideoTabs() {
  const [state, setState] = useState<BeforeAfter>("before");
  return <BeforeAfterTabs value={state} onChange={setState} />;
}
