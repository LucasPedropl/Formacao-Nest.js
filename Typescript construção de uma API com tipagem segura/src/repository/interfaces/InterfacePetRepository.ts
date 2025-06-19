import PetEntity from '../../entity/PetEntity';
import EnumPorte from '../../enum/EnumPorte';

export default interface InterfacePetRepository {
	criarPet(pet: PetEntity): void | Promise<void>;
	listaPets(): Array<PetEntity> | Promise<Array<PetEntity>>;
	atualizaPet(
		id: number,
		pet: PetEntity
	): Promise<{ success: boolean; message?: string }> | void;
	deletaPet(
		id: number
	): Promise<{ success: boolean; message?: string }> | void;
	adotaPet(
		idPet: number,
		idAdotante: number
	): Promise<{ success: boolean; message?: string }> | void;
	buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
		campo: Tipo,
		valor: PetEntity[Tipo]
	): Promise<PetEntity[]> | PetEntity[];
}
