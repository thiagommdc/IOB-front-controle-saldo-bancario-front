"use client";

import React, { useEffect, useState } from "react";
import NovaConta from "./components/NovaConta/NovaConta";
import CreditoDebito from "./components/CreditoDebito/CreditoDebito";
import Transferencia from "./components/Transferencia/Transferencia";
import Saldo from "./components/Saldo/Saldo";
import Transacoes from "./components/Transacoes/Transacoes";
import "./globals.css";
import { ContasContext } from "./contexts/ContasContext";
import { IContaBancaria } from "./interface/IContaBancaria";
import { listarContasService } from "./service/service";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("account-section");
  const [contas, setContas] = useState<IContaBancaria[]>([]);

  const setItems = (newItems: IContaBancaria[]) => {
    setContas(newItems);
  };

  const addItem = (conta: IContaBancaria) => {
    setContas([...contas, conta]);
  };

  const removeItem = (id: number) => {
    setContas(contas.filter((conta) => conta.id !== id));
  };

  useEffect(() => {
    atualizarContas();
  }, []);

  const atualizarContas = async () => {
    const contas = await listarContasService();
    if (Array.isArray(contas)) setItems(contas);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "account-section":
        return <NovaConta />;
      case "transaction-section":
        return <CreditoDebito />;
      case "balance-section":
        return <Saldo />;
      case "history-section":
        return <Transacoes />;
      case "transfer-section":
        return <Transferencia />;
      default:
        return <NovaConta />;
    }
  };

  return (
    <ContasContext.Provider value={{ contas, setItems, addItem, removeItem }}>
      <div className="container">
        <header>
          <h1>Gerenciamento de Contas Bancárias</h1>
        </header>
        <nav>
          <button
            className="tab-button"
            onClick={() => setActiveComponent("account-section")}
          >
            Criar Conta
          </button>
          <button
            className="tab-button"
            onClick={() => setActiveComponent("balance-section")}
          >
            Consultar Saldo
          </button>
          <button
            className="tab-button"
            onClick={() => setActiveComponent("history-section")}
          >
            Histórico
          </button>
          <button
            className="tab-button"
            onClick={() => setActiveComponent("transaction-section")}
          >
            Crédito/Débito
          </button>
          <button
            className="tab-button"
            onClick={() => setActiveComponent("transfer-section")}
          >
            Transferência
          </button>
        </nav>
        <main>{renderComponent()}</main>
      </div>
    </ContasContext.Provider>
  );
}
