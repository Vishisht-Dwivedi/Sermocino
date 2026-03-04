export const successResponse = {
  type: "object",
  required: ["ok", "code", "data"],
  properties: {
    ok: { type: "boolean", const: true },
    code: { type: "number" },
    data: { type: "object" }
  }
};

export const errorResponse = {
  type: "object",
  required: ["ok", "code", "error"],
  properties: {
    ok: { type: "boolean", const: false },
    code: { type: "number" },
    error: {
      type: "object",
      required: ["type", "message"],
      properties: {
        type: { type: "string" },
        message: { type: "string" }
      }
    }
  }
};