import { NextFunction, Request, Response } from "express";
import * as yup from "yup"
import { TipoRequestBodyAdotante } from "../../tipos/tiposRequestBodyAdotante";

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required(),
  senha: yup.string().defined().required().min(6),
  foto: yup.string().optional(),
})

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body, {
        abortEarly: false
        });
        return next();
      } catch(error) {
        const yupErrors = error as yup.ValidationError;
  
        const valdationErrors: Record<string, string> = {};
  
        yupErrors.inner.forEach((error) => {
          if(!error.path) return
          valdationErrors[error.path] = error.message;
        });
        return res.status(400).json(valdationErrors)
      }
};

export {middlewareValidadorBodyAdotante};