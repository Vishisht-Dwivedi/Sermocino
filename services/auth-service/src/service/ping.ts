import sql from "../db.js";
export default async function ping() {
    try {
        const now = await sql`
        SELECT NOW()
        `
        return {
            status: "ok"
        }
    } catch(err) {
        console.log("PING Service Error: ",err);
        return {
            status: "error"
        }
    }
}