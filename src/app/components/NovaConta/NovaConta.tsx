import { ContasContext } from "@/app/contexts/ContasContext";
import { listarContasService, novaContaService } from "@/app/service/service";
import React, { useState, useContext } from "react";

export default function NovaConta() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { setItems } = useContext(ContasContext);

  const incluirConta = async (event: any) => {
    event.preventDefault();
    try {
      const response = await novaContaService(nome);
      if (response) atualizarContas();
      setMensagem(`${response}`);
    } catch (error) {
      setMensagem("Erro ao criar conta");
    }
  };

  const atualizarContas = async () => {
    try {
      const contas = await listarContasService();
      if (Array.isArray(contas)) setItems(contas);
    } catch (error) {
      setMensagem("Erro ao atualizar lista de contas");
    }
  };

  return (
    <section className="account-section">
      <h2>Criação de Conta Bancária</h2>
      <form onSubmit={incluirConta}>
        <input
          type="text"
          id="account-name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da Conta"
          required
        />
        <button type="submit">Criar Conta</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </section>
  );
}
