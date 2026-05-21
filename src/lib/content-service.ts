export interface LocalizedNotice {
  id: number;
  title: string;
  date: string;
  category: string;
  isUrgent: boolean;
  content: string;
}

export async function getContent(section?: string, lang: string = 'en') {
  // Determine base URL
  const baseUrl = typeof window !== 'undefined' 
    ? '' 
    : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  const url = `${baseUrl}/api/content?lang=${lang}${section ? `&section=${section}` : ''}`;
  
  try {
    const res = await fetch(url, { 
      next: { revalidate: 60 }, // ISR: Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error(`Fetch failed for ${url}: ${res.statusText}`);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Content Service Error:', error);
    return null;
  }
}
