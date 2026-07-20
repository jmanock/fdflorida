"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { analyticsDecision, initializeAnalytics, subscribeAnalyticsDebug, resetAnalyticsDebug, type AnalyticsDebugRecord } from "@/lib/analytics";

export function AnalyticsBootstrap() {
  const [records, setRecords] = useState<AnalyticsDebugRecord[]>([]);
  const debug = useSyncExternalStore(() => () => {}, () => analyticsDecision().debug, () => false);
  useEffect(() => {
    initializeAnalytics("G-6Y3PZJ046S", "x2rrkkuyby");
    return subscribeAnalyticsDebug(setRecords);
  }, []);
  if (!debug) return null;
  return <aside aria-label="Analytics debug" style={{position:"fixed",right:8,bottom:8,zIndex:9999,maxWidth:420,maxHeight:260,overflow:"auto",background:"#102a43",color:"white",padding:12,font:"12px/1.4 monospace",borderRadius:8}}><strong>FDN analytics debug</strong><button style={{float:"right"}} type="button" onClick={resetAnalyticsDebug}>Reset</button>{records.slice(-12).map((item, index)=><pre key={`${item.timestamp}-${index}`} style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(item,null,2)}</pre>)}</aside>;
}
