import express from 'express';
import PetController from '../controller/petController';
import PetRepository from '../repository/PetRepository';
import { AppDataSource } from '../config/dataSource';

const petRouter = express.Router();
const petRepository = new PetRepository(
	AppDataSource.getRepository('PetEntity')
);
const petController = new PetController(petRepository);

petRouter.post('/pets', (req, res) => {
	petController.criarPet(req, res);
});

petRouter.get('/pets', (req, res) => {
	petController.listaPets(req, res);
});

petRouter.put('/pets/:id', (req, res) => {
	petController.atualizaPet(req, res);
});

petRouter.delete('/pets/:id', (req, res) => {
	petController.deletaPet(req, res);
});


export default petRouter;
