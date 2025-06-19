import { Request, Response } from 'express';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repository/PetRepository';
import PetEntity from '../entity/PetEntity';
import EnumPorte from '../enum/EnumPorte';

export default class PetController {
	constructor(private repository: PetRepository) {}

	async criarPet(req: Request, res: Response) {
		const { adotado, especie, porte, dataNascimento, nome, adotante } = <
			PetEntity
		>req.body;
		if (!Object.values(EnumEspecie).includes(especie)) {
			return res.status(400).json({ message: 'Espécie inválida' });
		}
		if (porte && !(porte in EnumPorte)) {
			return res.status(400).json({ message: 'Porte inválido' });
		}
		if (adotado && !adotante) {
			return res.status(400).json({
				message: 'Se o pet é adotado, informe o ID do adotante',
			});
		}

		let adotanteEntity = null;
		if (adotante) {
			adotanteEntity = await this.repository[
				'adotanteRepository'
			].findOne({
				where: { id: Number(adotante) },
			});
			if (!adotanteEntity) {
				return res
					.status(400)
					.json({
						message: 'Adotante não encontrado para o ID informado',
					});
			}
		}

		const novoPet = new PetEntity(
			nome,
			especie,
			adotado,
			dataNascimento,
			adotante,
			porte
		);

		await this.repository.criarPet(novoPet);
		return res.status(201).json(novoPet);
	}

	async listaPets(req: Request, res: Response) {
		const listaDePets = await this.repository.listaPets();
		return res.status(200).json(listaDePets);
	}

	async atualizaPet(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.atualizaPet(
			Number(id),
			req.body as PetEntity
		);
		if (!success) {
			return res.status(404).json({ message });
		}
		return res.sendStatus(204);
	}

	async deletaPet(req: Request, res: Response) {
		const { id } = req.params;
		const { success, message } = await this.repository.deletaPet(
			Number(id)
		);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.sendStatus(204);
	}

	async adotaPet(req: Request, res: Response) {
		const { pet_id, adotante_id } = req.params;

		const { success, message } = await this.repository.adotaPet(
			Number(pet_id),
			Number(adotante_id)
		);

		if (!success) {
			return res.status(404).json({ message });
		}
		return res.sendStatus(204);
	}



	async buscaPetPorCampoGenerico(req: Request, res: Response){
		const {campo, valor} = req.query
		const listaDePets = await this.repository.buscaPetPorCampoGenerico(
			campo as keyof PetEntity,
			valor as string
		);
		return res.status(200).json(listaDePets)
	}
}
