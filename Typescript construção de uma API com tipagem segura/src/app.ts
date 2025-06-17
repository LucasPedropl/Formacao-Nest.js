import express, { Response } from 'express';
import router from './routes';
import 'reflect-metadata';
import { AppDataSource } from './config/dataSource';

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(() => {
	console.log("Banco de dados conectado com sucesso");
}).catch((error) => {
	console.log("erro:",error)
})

export default app;
