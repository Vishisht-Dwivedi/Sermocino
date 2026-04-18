import { FastifyRequest, FastifyReply } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { uploadImageService } from "../../services/upload/image.service.js";
import { UUID } from "node:crypto";

type AuthenticatedRequest = FastifyRequest & {
  user?: {
    sub: UUID;
  };
};

export const uploadImageController = async (
  req: AuthenticatedRequest,
  reply: FastifyReply
): Promise<void> => {
  const file: MultipartFile | undefined = await req.file();

  if (!file) {
    return reply.code(422).send({
      ok: false,
      code: 422,
      error: {
        type: "UNPROCESSABLE_INPUT",
        message: "File missing"
      }
    });
  }

  const userId = req.user?.sub;

  if (!userId) {
    return reply.code(401).send({
      ok: false,
      code: 401,
      error: {
        type: "AUTH_INVALID_CREDENTIALS",
        message: "User not authenticated"
      }
    });
  }

  try {
    const result = await uploadImageService({
      stream: file.file,
      mimetype: file.mimetype,
      userId
    });

    return reply.send({
      ok: true,
      code: 200,
      data: {
        fileId: result.fileId,
        url: result.path
      }
    });
  } catch (err) {
    if (err instanceof Error && err.message === "INVALID_FILE_TYPE") {
      return reply.code(422).send({
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Invalid file type"
        }
      });
    }
    throw err;
  }
};