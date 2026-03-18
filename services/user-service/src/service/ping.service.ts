export default async function ping() {
  try {
    return {
      status: "ok",
    };
  } catch (err) {
    return {
      status: "error",
      error: err,
    };
  }
}
