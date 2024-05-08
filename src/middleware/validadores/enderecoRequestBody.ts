import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/Endereco";

const esquemaBoEndereco: yup.ObjectSchema<
  Omit<EnderecoEntity, "id">
> = yup.object({
  cidade: yup.string().defined().required(),
  estado: yup.string().defined().required(),
});


const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBoEndereco.validate(req.body, {
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

export {middlewareValidadorBodyEndereco};