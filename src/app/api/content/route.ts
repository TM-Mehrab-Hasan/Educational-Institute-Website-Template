import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    const section = searchParams.get('section'); // Optional: only fetch specific section

    const dbPath = path.join(process.cwd(), 'src/data/db.json');
    const dbRaw = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(dbRaw);

    // Helper to localize an object or array
    const localize = (obj: any): any => {
      if (Array.isArray(obj)) return obj.map(localize);
      if (obj && typeof obj === 'object') {
        // If it's a leaf localization node (has en/bn keys)
        if (Object.keys(obj).length === 2 && obj['en'] !== undefined && obj['bn'] !== undefined) {
          return obj[lang as 'en' | 'bn'] || obj['en'];
        }
        
        // Otherwise, recurse
        const newObj: any = {};
        for (const key in obj) {
          newObj[key] = localize(obj[key]);
        }
        return newObj;
      }
      return obj;
    };

    let data = db;
    if (section && db[section]) {
      data = db[section];
    }

    return NextResponse.json(localize(data));
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
