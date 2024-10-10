import { IApiError } from '../interface/ApiError';
import { requestAxios } from './api';
import { IContaBancaria } from '../interface/IContaBancaria';
import { IHistoricoTransacao } from '../interface/IHistoricoTransacao';
import { ITransferencia } from '../interface/ITransferencia';


export async function novaContaService(nome: string): Promise<string | IApiError> {
    try {
        const retorno = await requestAxios<string>('POST', `ContasBancarias/criar/${nome}`);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function creditoService(contaId: string, valor: number): Promise<string | IApiError> {
    try {
        const retorno = await requestAxios<string>('PUT', `ContasBancarias/creditar/${contaId}/${valor}`);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function debitoService(contaId: string, valor: number): Promise<string | IApiError> {
    try {
        const retorno = await requestAxios<string>('PUT', `ContasBancarias/debitar/${contaId}/${valor}`);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function listarContasService(): Promise<IContaBancaria[] | IApiError> {
    try {
        return await requestAxios<IContaBancaria[]>('GET', `ContasBancarias/listar`);
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function saldoContaService(contaId:number): Promise<number | IApiError> {
    try {
        return await requestAxios<number>('GET', `ContasBancarias/saldo/${contaId}`);
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function realizarcreditoDebitoService(metodo: 'debitar' | 'creditar', contaId: number, valor: number): Promise<string | IApiError> {
    try {
        return await requestAxios<string>('PUT', `ContasBancarias/${metodo}/${contaId}/${valor}`);
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export async function listarTransacoesService(contaId:number): Promise<IHistoricoTransacao[] | IApiError> {
    try {
        return await requestAxios<IHistoricoTransacao[]>('GET', `ContasBancarias/extrato/${contaId}`);
    } catch (error: any) {
        console.error('Erro ao baixar o extrato:', error);
        throw error;
    }
}

export async function transferirService(dadosTransferencia:ITransferencia): Promise<string | IApiError> {
    try {
        return await requestAxios<string>('PUT', `ContasBancarias/transferir`, dadosTransferencia);
    } catch (error: any) {
        console.error('Erro ao realizar transferência:', error);
        throw error;
    }
}

