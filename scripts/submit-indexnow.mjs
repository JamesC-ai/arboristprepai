import { readFile } from "node:fs/promises";

const siteUrl = "https://arborist.pagecheckai.com";
const host = "arborist.pagecheckai.com";
const key = "e8126d98dca197b3cbcb885cacac678c";
const keyLocation = `${siteUrl}/${key}.txt`;
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

const body = await response.text();
console.log(`IndexNow status: ${response.status}`);
console.log(`Submitted URLs: ${urlList.length}`);
if (body.trim()) console.log(body);
if (![200, 202].includes(response.status)) process.exitCode = 1;
