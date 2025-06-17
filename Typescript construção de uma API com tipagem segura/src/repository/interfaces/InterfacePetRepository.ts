import PetEntity from '../../entity/PetEntity';

export default interface InterfacePetRepository {
	criarPet(pet: PetEntity): void | Promise<void>;
	listaPets(): Array<PetEntity> | Promise<Array<PetEntity>>;
	atualizaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
	deletaPet(id: number): Promise<{ success: boolean; message?: string }> | void;
}
