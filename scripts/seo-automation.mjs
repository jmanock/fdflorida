import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");

const siteConfigs = {
  flightdealsflorida: {
    siteDir: "flightdealsflorida",
    host: "flightdealsflorida.org",
    clarityId: "x2rrkkuyby",
    key: "527d3b7243c14f34832b1987a6bfedcd",
    keyFile: "527d3b7243c14f34832b1987a6bfedcd.txt",
    importantPaths: ["/", "/sitemap.xml", "/robots.txt"],
    affiliatePatterns: ["flight-deals", "cheap-flights", "airport", "route"]
  },
  hoteldealsflorida: {
    siteDir: "hoteldealsflorida",
    host: "hoteldealsflorida.org",
    clarityId: "x2rr9176m5",
    key: "e7c0a9ff953b4d60ba8d5dac45755dd5",
    keyFile: "e7c0a9ff953b4d60ba8d5dac45755dd5.txt",
    importantPaths: ["/", "/sitemap.xml", "/robots.txt"],
    affiliatePatterns: ["hotel", "resort", "beach", "cruise-port"]
  },
  cruisedealsflorida: {
    siteDir: "cruisedealsflorida",
    host: "cruisedealsflorida.org",
    clarityId: "x2rqxjxm7z",
    key: "5f632a722c894d23952d174b464073b6",
    keyFile: "5f632a722c894d23952d174b464073b6.txt",
    importantPaths: ["/", "/sitemap.xml", "/robots.txt"],
    affiliatePatterns: ["cruise", "bahamas", "caribbean", "port"]
  },
  localdealsflorida: {
    siteDir: "localdealsflorida",
    host: "localdealsflorida.org",
    clarityId: "x2rqk7yk0w",
    key: "f39e0edd3bea4619a3bb32b8eb48cdd4",
    keyFile: "f39e0edd3bea4619a3bb32b8eb48cdd4.txt",
    importantPaths: ["/", "/sitemap.xml", "/robots.txt"],
    affiliatePatterns: ["things-to-do", "activities", "gear", "boat", "water"]
  },
  floridadealshub: {
    siteDir: "floridadealshub",
    host: "floridadealshub.com",
    clarityId: "x2rq163j9a",
    key: "f542068487524e578003f56fc0c31b3a",
    keyFile: "f542068487524e578003f56fc0c31b3a.txt",
    importantPaths: ["/", "/journal", "/orlando", "/miami", "/sitemap.xml", "/robots.txt"],
    affiliatePatterns: ["gear", "hotel", "water", "cruise", "fishing", "boat"]
  }
};

const argMap = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...valueParts] = arg.replace(/^--/, "").split("=");
    return [key, valueParts.join("=") || true];
  })
);
const mode = argMap.mode || "report";
const configName = argMap.site;

if (!configName || !siteConfigs[configName]) {
  console.error(`Missing or invalid --site. Use one of: ${Object.keys(siteConfigs).join(", ")}`);
  process.exit(1);
}

const config = siteConfigs[configName];
const publicRoot = path.join(siteRoot, "public");
const seoStateDir = path.join(siteRoot, ".seo");
const sitemapUrl = `https://${config.host}/sitemap.xml`;
const indexNowEndpoint = "https://api.indexnow.org/indexnow";

function absoluteUrl(pathOrUrl) {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }
  return `https://${config.host}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

async function fetchText(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.text();
}

async function fetchTextOptional(url) {
  try {
    return await fetchText(url);
  } catch (error) {
    return { error: error.message };
  }
}

async function fileExists(filePath) {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

async function readLocalKeyFile() {
  return readFile(path.join(publicRoot, config.keyFile), "utf8");
}

async function readRobotsSource() {
  const staticRobots = path.join(publicRoot, "robots.txt");
  if (await fileExists(staticRobots)) return readFile(staticRobots, "utf8");
  const appRobots = path.join(siteRoot, "app", "robots.ts");
  if (await fileExists(appRobots)) return readFile(appRobots, "utf8");
  return "";
}

async function getLocalRouteHints() {
  const hints = [];
  const appSitemap = path.join(siteRoot, "app", "sitemap.ts");
  const appSitemapJs = path.join(siteRoot, "app", "sitemap.js");
  for (const sitemapPath of [appSitemap, appSitemapJs]) {
    if (await fileExists(sitemapPath)) hints.push(await readFile(sitemapPath, "utf8"));
  }
  if (configName === "floridadealshub") {
    for (const localFile of [
      path.join(siteRoot, "data", "journal", "stories.json"),
      path.join(siteRoot, "data", "journal", "storyCategories.json")
    ]) {
      if (await fileExists(localFile)) hints.push(await readFile(localFile, "utf8"));
    }
  }
  return hints.join("\n");
}

async function collectSourceFiles(dir, files = []) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    if (["node_modules", ".next", ".git", ".seo"].includes(entry.name)) continue;
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectSourceFiles(entryPath, files);
      continue;
    }
    if (/\.(js|jsx|ts|tsx|json)$/.test(entry.name)) files.push(entryPath);
  }

  return files;
}

async function getLocalReportCounts() {
  const sourceFiles = await collectSourceFiles(siteRoot);
  let sourceText = "";

  for (const filePath of sourceFiles) {
    try {
      sourceText += `\n${await readFile(filePath, "utf8")}`;
    } catch {
      // Ignore unreadable source files.
    }
  }

  let stories = 0;
  let destinations = 0;

  if (configName === "floridadealshub") {
    try {
      stories = JSON.parse(await readFile(path.join(siteRoot, "data", "journal", "stories.json"), "utf8"))
        .filter((story) => story.status !== "draft" && story.status !== "review").length;
    } catch {
      stories = 0;
    }
    destinations = (sourceText.match(/name:\s*"[^"]+",\s*\n\s*slug:/g) || []).length;
  }

  const slugMatches = sourceText.match(/slug["']?\s*[:=]\s*["'][a-z0-9-]+["']/g) || [];
  const jsonSlugMatches = sourceText.match(/"slug"\s*:\s*"[a-z0-9-]+"/g) || [];
  const pathMatches = sourceText.match(/\/[a-z0-9][a-z0-9-]+/g) || [];
  const uniqueRouteSignals = new Set([...slugMatches, ...jsonSlugMatches, ...pathMatches]);
  const affiliateLandingPages = [...uniqueRouteSignals].filter((value) =>
    config.affiliatePatterns.some((pattern) => value.toLowerCase().includes(pattern))
  ).length;

  return {
    estimatedRoutes: Math.max(uniqueRouteSignals.size, stories + destinations),
    stories,
    destinations,
    affiliateLandingPages
  };
}

function parseSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1]);
}

async function getSitemapUrls() {
  const xml = await fetchText(sitemapUrl);
  const urls = parseSitemapUrls(xml);
  return { xml, urls };
}

async function getSitemapUrlsOptional() {
  try {
    return await getSitemapUrls();
  } catch (error) {
    return { xml: "", urls: [], error: error.message };
  }
}

async function getPreviousUrls() {
  try {
    return JSON.parse(await readFile(path.join(seoStateDir, "last-sitemap-urls.json"), "utf8"));
  } catch {
    return [];
  }
}

async function saveCurrentUrls(urls) {
  await mkdir(seoStateDir, { recursive: true });
  await writeFile(path.join(seoStateDir, "last-sitemap-urls.json"), `${JSON.stringify(urls, null, 2)}\n`);
}

async function appendIndexNowHistory(records) {
  await mkdir(seoStateDir, { recursive: true });
  const historyPath = path.join(seoStateDir, "indexnow-history.json");
  let history = [];

  try {
    history = JSON.parse(await readFile(historyPath, "utf8"));
  } catch {
    history = [];
  }

  await writeFile(historyPath, `${JSON.stringify([...history, ...records], null, 2)}\n`);
}

async function getIndexNowHistory() {
  try {
    return JSON.parse(await readFile(path.join(seoStateDir, "indexnow-history.json"), "utf8"));
  } catch {
    return [];
  }
}

function unique(items) {
  return [...new Set(items)];
}

function classifyUrls(urls) {
  return {
    stories: urls.filter((url) => url.includes("/journal/") && !url.includes("/journal/news/")).length,
    destinations: urls.filter((url) =>
      ["/orlando", "/miami", "/key-west", "/clearwater", "/destin", "/st-augustine", "/tampa"].some((path) =>
        url.endsWith(path)
      )
    ).length,
    affiliateLandingPages: urls.filter((url) =>
      config.affiliatePatterns.some((pattern) => url.toLowerCase().includes(pattern))
    ).length
  };
}

async function runValidate() {
  const { urls, error: sitemapFetchError } = await getSitemapUrlsOptional();
  const robots = await readRobotsSource();
  const keyText = await readLocalKeyFile();
  const homeFetch = await fetchTextOptional(`https://${config.host}/`);
  const homeHtml = typeof homeFetch === "string" ? homeFetch : "";
  const routeHints = await getLocalRouteHints();
  const errors = [];
  const warnings = [];
  const classes = classifyUrls(urls);

  if (!urls.length && sitemapFetchError) warnings.push(`Live sitemap fetch skipped/failed: ${sitemapFetchError}`);
  if (!robots.includes(`Sitemap: ${sitemapUrl}`) && !robots.includes(sitemapUrl)) {
    errors.push(`robots.txt missing Sitemap: ${sitemapUrl}`);
  }
  if (keyText.trim() !== config.key) errors.push(`IndexNow key file /${config.keyFile} does not contain expected key`);
  if (homeHtml && !homeHtml.includes("canonical")) errors.push("homepage canonical tag was not detected");
  if (/noindex/i.test(homeHtml)) errors.push("homepage contains noindex");
  if (/noindex/i.test(routeHints)) errors.push("source contains noindex");

  for (const importantPath of config.importantPaths) {
    const url = absoluteUrl(importantPath);
    if (importantPath.endsWith(".xml") || importantPath.endsWith(".txt")) continue;
    if (urls.length && !urls.includes(url)) warnings.push(`${url} not found in live sitemap`);
  }

  if (configName === "floridadealshub") {
    const requiredJournal = ["/journal", "/journal/disney-vs-universal", "/journal/theme-parks", "/orlando", "/miami"];
    for (const item of requiredJournal) {
      if (urls.length && !urls.includes(absoluteUrl(item))) errors.push(`${item} missing from Hub sitemap`);
      if (!routeHints.includes(item.replace("/journal/", "")) && !routeHints.includes(item.replace("/", ""))) {
        warnings.push(`${item} was not obvious in local route hints`);
      }
    }
  }

  console.log(JSON.stringify({ site: config.host, status: errors.length ? "failed" : "passed", urlCount: urls.length, ...classes, warnings, errors }, null, 2));

  if (errors.length) process.exit(1);
}

async function runIndexNow() {
  const { urls } = await getSitemapUrls();
  const previousUrls = await getPreviousUrls();
  const previousSet = new Set(previousUrls);
  const newUrls = urls.filter((url) => !previousSet.has(url));
  const updatedUrls = configName === "floridadealshub"
    ? urls.filter((url) => url.includes("/journal/") || ["/orlando", "/miami", "/key-west", "/clearwater", "/destin", "/st-augustine", "/tampa"].some((path) => url.endsWith(path)))
    : [];
  const queuedPath = path.join(seoStateDir, "indexnow-queue.json");
  let queuedUrls = [];

  try {
    queuedUrls = JSON.parse(await readFile(queuedPath, "utf8"));
  } catch {
    queuedUrls = [];
  }

  const urlList = unique([...newUrls, ...updatedUrls, ...queuedUrls]).slice(0, 10000);

  if (!urlList.length) {
    await saveCurrentUrls(urls);
    console.log(JSON.stringify({ site: config.host, submitted: 0, reason: "no new or queued URLs" }, null, 2));
    return;
  }

  const body = {
    host: config.host,
    key: config.key,
    keyLocation: `https://${config.host}/${config.keyFile}`,
    urlList
  };
  const response = await fetch(indexNowEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const ok = response.status >= 200 && response.status < 300;
  const record = {
    site: config.host,
    submittedAt: new Date().toISOString(),
    status: response.status,
    ok,
    totalUrls: urlList.length,
    newUrls: newUrls.length,
    updatedUrls: updatedUrls.length,
    queuedUrls: queuedUrls.length
  };

  await appendIndexNowHistory([record]);
  await saveCurrentUrls(urls);
  await writeFile(queuedPath, "[]\n");
  console.log(JSON.stringify(record, null, 2));

  if (!ok) process.exit(1);
}

async function runReport() {
  const { urls, error } = await getSitemapUrlsOptional();
  const history = await getIndexNowHistory();
  const classes = classifyUrls(urls);
  const localCounts = await getLocalReportCounts();
  const lastModifiedPages = urls.slice(-10);
  const submissionTotals = history.reduce(
    (acc, item) => ({
      attempts: acc.attempts + 1,
      successfulAttempts: acc.successfulAttempts + (item.ok ? 1 : 0),
      submittedUrls: acc.submittedUrls + (item.totalUrls || 0)
    }),
    { attempts: 0, successfulAttempts: 0, submittedUrls: 0 }
  );

  console.log(JSON.stringify({
    site: config.host,
    sitemapFetchError: error || null,
    totalIndexedRoutes: urls.length || localCounts.estimatedRoutes,
    totalStories: classes.stories || localCounts.stories,
    totalDestinationPages: classes.destinations || localCounts.destinations,
    sitemapUrlCount: urls.length || localCounts.estimatedRoutes,
    affiliateLandingPages: classes.affiliateLandingPages || localCounts.affiliateLandingPages,
    clarity: config.clarityId ? "configured" : "not configured",
    clarityId: config.clarityId || null,
    lastModifiedPages,
    indexNowSubmissionTotals: submissionTotals
  }, null, 2));
}

async function runQueue() {
  const urls = String(argMap.urls || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)
    .map(absoluteUrl);

  if (!urls.length) {
    console.log("No URLs supplied to queue.");
    return;
  }

  await mkdir(seoStateDir, { recursive: true });
  const queuePath = path.join(seoStateDir, "indexnow-queue.json");
  let existing = [];
  try {
    existing = JSON.parse(await readFile(queuePath, "utf8"));
  } catch {
    existing = [];
  }
  const next = unique([...existing, ...urls]);
  await writeFile(queuePath, `${JSON.stringify(next, null, 2)}\n`);
  console.log(JSON.stringify({ site: config.host, queued: urls.length, totalQueued: next.length, urls }, null, 2));
}

if (mode === "validate") await runValidate();
else if (mode === "indexnow") await runIndexNow();
else if (mode === "report") await runReport();
else if (mode === "queue") await runQueue();
else {
  console.error(`Unknown --mode=${mode}`);
  process.exit(1);
}
