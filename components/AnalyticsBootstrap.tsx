"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_CONFIG } from "@/lib/analyticsConfig";
import { analyticsDecision, initializeAnalytics, subscribeAnalyticsDebug, resetAnalyticsDebug, trackPageView, type AnalyticsDebugRecord } from "@/lib/analytics";

export function AnalyticsBootstrap() {
  const [records, setRecords] = useState<AnalyticsDebugRecord[]>([]);
  const pathname = usePathname();
  const debug = useSyncExternalStore(() => () => {}, () => analyticsDecision().debug, () => false);
  useEffect(() => {
    initializeAnalytics(ANALYTICS_CONFIG.measurementId, ANALYTICS_CONFIG.clarityId);
    return subscribeAnalyticsDebug(setRecords);
  }, []);
  useEffect(() => {
    trackPageView();
  }, [pathname]);
  if (!debug) return null;
  const decision = analyticsDecision();
  return <aside aria-label="Analytics debug" style={{position:"fixed",right:8,bottom:8,zIndex:9999,maxWidth:420,maxHeight:260,overflow:"auto",background:"#102a43",color:"white",padding:12,font:"12px/1.4 monospace",borderRadius:8}}><strong>FDN analytics debug</strong><button style={{float:"right"}} type="button" onClick={resetAnalyticsDebug}>Reset</button><pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify({measurementId:ANALYTICS_CONFIG.measurementId,hostname:location.hostname,enabled:decision.enabled,reason:decision.reason,environment:decision.environment,dataLayer:Array.isArray(window.dataLayer),gtag:typeof window.gtag,initialized:window.__FDN_GA_INITIALIZED===true},null,2)}</pre>{records.slice(-12).map((item, index)=><pre key={`${item.timestamp}-${index}`} style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(item,null,2)}</pre>)}</aside>;
}
