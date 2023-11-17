import puppeteer from "puppeteer-core";
import { put } from "@vercel/blob";
import { z } from "zod";

console.log("🚀 Starting port " + process.env.PORT);

const headers = {
  base: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST",
  },
};

const schema = z.object({
  url: z.string(),
  upload: z.string().optional(),
});

Bun.serve({
  hostname: "::",
  port: process.env.PORT || 3001,
  fetch: async (request: Request) => {
    try {
      let url = "";
      let upload: string;

      if (request.method === "GET") {
        const { searchParams } = new URL(request.url);

        url = searchParams.get("url") as string;
        upload = searchParams.get("upload") || "";

        if (!url)
          return new Response(
            "Welcome to Sitegrab API!\n\nThe rest is simple: just put ?url=DOMAIN_HERE in the URL.\n\nFor example, https://sitegrab-production.up.railway.app/?url=google.com"
          );
      } else {
        const body = (await request.json()) as any;

        url = body.url;
        upload = body.upload;

        if (!url) return new Response('Pass { "url": "example.com" } in body');
      }

      // Validate inputs against schema
      schema.parse({
        url,
        upload,
      });

      console.log(`📸 Taking screenshot of ${url}`);

      // Add https if not already
      url = url.startsWith("https://") ? url : `https://${url}`;

      // Connect to browserless
      const browser = await puppeteer.connect({
        browserWSEndpoint:
          "wss://chrome.browserless.io?token=2c27643a-0f80-495c-afe2-3f7632965b9e",
      });

      const page = await browser.newPage();

      // Wait until network activity settles to 2 req/s
      await page.goto(url, { waitUntil: "networkidle2" });
      await page.setViewport({ width: 1920, height: 1200 });

      const screenshot = await page.screenshot();

      let res: Response;

      if (!upload) {
        res = new Response(screenshot, {
          headers: {
            "Content-Type": "image/png",
            ...headers.base,
          },
        });
      } else {
        const uid = Math.random().toString(36).substring(2, 15);
        const baseUrl = url.replace(/(^\w+:|^)\/\//, "");
        const fileName = `${baseUrl}-${uid}.png`;

        console.log(`⏫ Uploading ${fileName}`);

        const blob = new Blob([screenshot]);

        const upload = await put(fileName, blob, { access: "public" });

        res = new Response(upload.url, {
          headers: {
            "Content-Type": "text/plain",
            ...headers.base,
          },
        });
      }

      await browser.close();

      console.log("🚪 Closing browser\n\n");

      return res;
    } catch (error: any) {
      console.error(error);

      return new Response(`Something went wrong: ${error.message || "?"}`, {
        status: 500,
      });
    }
  },
});
