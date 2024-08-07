import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController, FaculdadesController } from './../controllers';


const router = Router();



router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.post('/cidades', CidadesController.createBodyValidator, CidadesController.createQueryValidator,CidadesController.create);
router.post('/faculdades', FaculdadesController.create);


export { router };
