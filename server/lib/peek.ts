// server/lib/peek.ts
interface FetchOptions {
  method?: string;
  body?: any;
}

interface CatalogItem {
  productId: string;
  optionId: string;
  name: string;
  optionName: string;
}

interface AvailabilitySlot {
  availabilityId?: string;
  start: string;
  capacity: number;
  vacancies: number;
  filled: number;
  status: string;
}

interface AvailabilityQuery {
  productId: string;
  optionId: string;
  localDateStart: string;
  localDateEnd: string;
}

const BASE = "https://octo.peek.com";
const WEBHOOK_URL = "https://octo.peek.com/integrations/octo/webhooks";

// Alternative API endpoints to try
const API_BASES = [
  "https://octo.peek.com",
  "https://api.octo.peek.com", 
  "https://octo.peek.com/api/v1",
  "https://api.peek.com"
];

async function fetchJSON(path: string, { method = "GET", body }: FetchOptions = {}): Promise<any> {
  // Use Bearer token authentication as per OCTO API docs
  const apiKey = process.env.OCTO_API_KEY || "4d516893e31c10037c7075326b2c17a6";
  
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    throw new Error(`${method} ${path} failed: ${res.status} ${res.statusText} - ${errorText}`);
  }
  
  return res.json();
}

// Canaveral Tours product catalog - update with real IDs from Peek
export const CATALOG: CatalogItem[] = [
  { productId: "lighthouse-spaceflight", optionId: "premier-4hr", name: "Lighthouse & Spaceflight Premier Tour", optionName: "4 Hours" },
  { productId: "hangar-c", optionId: "excursion-2hr", name: "Lighthouse & Hangar C Excursion", optionName: "2 Hours" },
  { productId: "missile-museum", optionId: "excursion-3hr", name: "Lighthouse & Missile Museum Excursion", optionName: "3 Hours" },
];

export async function getNextAvailableSlot({ productId, optionId, localDateStart, localDateEnd }: AvailabilityQuery): Promise<AvailabilitySlot | null> {
  const payload = { productId, optionId, localDateStart, localDateEnd };
  const data = await fetchJSON("/integrations/octo/availability", { method: "POST", body: payload });

  // Expect an array of timeslots; pick the earliest where available === true
  if (!Array.isArray(data) || data.length === 0) return null;

  const slots = data
    .filter((s: any) => s?.available === true)
    .sort((a: any, b: any) => new Date(a.localDateTimeStart).getTime() - new Date(b.localDateTimeStart).getTime());

  if (slots.length === 0) return null;
  const s = slots[0];

  // many OCTO deployments include these fields:
  // s.capacity, s.vacancies, s.localDateTimeStart
  const capacity  = Number(s.capacity ?? 0);
  const vacancies = Number(s.vacancies ?? 0);
  return {
    availabilityId: s.id,
    start: s.localDateTimeStart,
    capacity,
    vacancies,
    filled: Math.max(0, capacity - vacancies),
    status: s.status || (vacancies <= 0 ? "SOLD_OUT" : (capacity ? (vacancies / capacity < 0.5 ? "LIMITED" : "AVAILABLE") : "AVAILABLE")),
  };
}

// Export statements are already at the function and constant declarations above