import { DataSource } from 'typeorm';
import PetEntity from '../entity/PetEntity';
import AdotanteEntity from '../entity/AdotanteEntity';
import EnderecoEntity from '../entity/EnderecoEntity';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: './src/config/database.sqlite',
	entities: [PetEntity, AdotanteEntity, EnderecoEntity],
	synchronize: true,
});
