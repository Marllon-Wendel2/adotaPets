import { NextFunction, Request, Response } from "express";
import * yup from "yup"
import { TipoRequestBodyAdotante } from "../../tipos/tiposRequestBodyAdotante";

const esquemaBodyAdotante:  yup. ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">>=yup.object({
    nome:yup.string().defined().required(),
    celular:yup.string().defined().required(),
    senha:yup.string().defined().required().min(6),
    foto:yup.string().optional(),
  });

const middleware:validador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esq.validate(req.body, {
        abortEarly: false
        });
        try {
            abort
        }
      } catch(error) {
        const yupErrors = error as yup.ValidationError;
  
        const valdationErrors: Record<string, string> = {};
  
        yupErrors.inner.forEach((error) => {
          if(!error.path) return
          valdationErrors[error.path] = error.message;
        });
        return res.status(400).json(valdationErrors)
      }
}