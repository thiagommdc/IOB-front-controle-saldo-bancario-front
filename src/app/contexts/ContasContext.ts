import { createContext, useState } from 'react';
import { IContaBancaria } from '../interface/IContaBancaria';

export interface ItemContextType {
    contas: IContaBancaria[];
    setItems: (newItems: IContaBancaria[]) => void;
    addItem: (item: IContaBancaria) => void;
    removeItem: (id: number) => void;
}

export const ContasContext = createContext<ItemContextType>({
    contas: [],
    setItems: () => {},
    addItem: () => {},
    removeItem: () => {}
});