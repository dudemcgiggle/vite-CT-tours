import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../../shared/schema";

const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/canaveral_tours";

const client = neon(connectionString);
export const db = drizzle(client, { schema });