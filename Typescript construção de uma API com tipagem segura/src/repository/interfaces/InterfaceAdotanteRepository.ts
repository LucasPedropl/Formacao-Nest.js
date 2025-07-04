import AdotanteEntity from '../../entity/AdotanteEntity';
import EnderecoEntity from '../../entity/EnderecoEntity';

export default interface InterfaceAdotanteRepository {
	criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
	listaAdotantes(): Array<AdotanteEntity> | Promise<Array<AdotanteEntity>>;
	atualizaAdotante(
		id: number,
		adotante: AdotanteEntity
	): Promise<{ success: boolean; message?: string }> | void;
	deletaAdotante(
		id: number
	): Promise<{ success: boolean; message?: string }> | void;

	atualizaEnderecoAdotante(
		idAdotante: number,
		endereco: EnderecoEntity
	): Promise<{ success: boolean; message?: string }> | void;
}
