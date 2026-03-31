import { Client } from "pg";

async function main() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = new Client({
    connectionString: DATABASE_URL,
  });

  await client.connect();

  const sql = `
  DO $$
  BEGIN
      IF NOT EXISTS (
          SELECT 1
          FROM information_schema.table_constraints
          WHERE constraint_name = 'profiles_user_fk'
      ) THEN
          ALTER TABLE "user"."profiles"
          ADD CONSTRAINT profiles_user_fk
          FOREIGN KEY ("id")
          REFERENCES "auth"."users"("id")
          ON DELETE CASCADE;
      END IF;
  END $$;
  `;

  await client.query(sql);

  console.log("FK ensured (user.profiles to auth.users)");

  await client.end();
}

main().catch((e) => {
  console.error("FK setup failed", e);
  process.exit(1);
});