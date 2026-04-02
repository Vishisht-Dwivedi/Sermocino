import { FastifyRequest, FastifyReply } from "fastify";
import { uploadImageService } from "../../services/upload/image.service.js";

export const uploadImageController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
    const file = await req.file();
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
    const buffer = await file.toBuffer();
    const userId = req.user?.sub;
    try {
        const result = await uploadImageService({
            buffer,
            mimetype: file.mimetype,
            userId: userId?userId:""
        });
        return reply.send({
            ok: true,
            code: 200,
            data: {
                fileId: result.fileId,
                url: null // will come after processing
            }
        });
    } catch (err: any) {
        if (err.message === "INVALID_FILE_TYPE") {
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