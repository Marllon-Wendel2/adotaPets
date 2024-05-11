import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import {pt} from "yup-locale-pt";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<
  Omit<TipoRequestBodyPet, "adotante">
> = yup.object({
  nome: yup.string().defined().required(),
  especie: yup
  .string()
  .oneOf(Object.values(EnumEspecie))
  .defined()
  .required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
  dataDeNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});


const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyPet.validate(req.body, {
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

export {middlewareValidadorBodyPet};