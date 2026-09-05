import fs from "fs";
import path from "path";

interface CacheEntry {
  mtimeMs: number;
  records: any[];
}

const memoryCache: Record<string, CacheEntry> = {};

export function getOrLoadJsonRecords(filename: string): any[] {
  try {
    const jsonPath = path.join(process.cwd(), "lib", filename);
    if (!fs.existsSync(jsonPath)) {
      return [];
    }

    const stat = fs.statSync(jsonPath);
    const currentMtime = stat.mtimeMs;

    const cached = memoryCache[filename];
    if (cached && cached.mtimeMs === currentMtime) {
      return cached.records;
    }

    const raw = fs.readFileSync(jsonPath, "utf-8");
    const records = JSON.parse(raw);

    memoryCache[filename] = {
      mtimeMs: currentMtime,
      records
    };

    return records;
  } catch (err) {
    console.error(`[jsonCache] Error loading ${filename}:`, err);
    return memoryCache[filename]?.records || [];
  }
}
