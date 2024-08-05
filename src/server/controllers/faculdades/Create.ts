import { Request, Response } from "express";

interface IFaculdade {
  nome: string;
}

export const create = (req: Request<{}, {}, IFaculdade>, res: Response) => {
  console.log(req.body);
  
  return res.send('Create!');
};
