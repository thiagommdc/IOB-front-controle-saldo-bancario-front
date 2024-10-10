import { ContasContext } from "@/app/contexts/ContasContext";
import { realizarcreditoDebitoService } from "@/app/service/service";
import React, { useContext, useState } from "react";

export default function CreditoDebito() {
  const { contas } = useContext(ContasContext);
  const [contaIdSelecionada, setContaIdSelecionada] = useState<number | null>(
    null
  );
  const [tipoTransacao, setTipoTransacao] = useState<
    "creditar" | "debitar" | null
  >(null);
  const [valor, setValor] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagemRetorno, setMensagemRetorno] = useState<string | null>(null);

  const changeSelectConta = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const idContaSelecionada = parseInt(event.target.value, 10);
    setContaIdSelecionada(idContaSelecionada);
  };

  const changeSelectTipoOperacao = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTipoTransacao(event.target.value as "creditar" | "debitar");
  };

  const alteraValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(parseFloat(event.target.value));
  };

  const realizarOperacao = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contaIdSelecionada || !tipoTransacao || valor <= 0) {
      setErro("Selecione uma conta, tipo de operação e valor positivo.");
      return;
    }

    try {
      if (tipoTransacao == null) return;
      const resposta = await realizarcreditoDebitoService(
        tipoTransacao,
        contaIdSelecionada,
        valor
      );
      setMensagemRetorno(resposta.toString());
      setContaIdSelecionada(null);
      setTipoTransacao(null);
      setValor(0);
      setErro(null);
    } catch (error: any) {
      setErro(error.mensagem);
    }
  };

  return (
    <section className="transaction-section">
      <h2>Operações de Crédito e Débito</h2>
      <form id="transaction-form" onSubmit={realizarOperacao}>
        <select
          id="account-select"
          value={contaIdSelecionada || 0}
          onChange={changeSelectConta}
        >
          <option value="">Selecione uma conta</option>
          {contas.map((conta) => (
            <option key={conta.id} value={conta.id}>
              {conta.nome}
            </option>
          ))}
        </select>
        <select
          id="transaction-type"
          value={tipoTransacao || 0}
          onChange={changeSelectTipoOperacao}
        >
          <option value="">Selecione o tipo</option>
          <option value="creditar">Crédito</option>
          <option value="debitar">Débito</option>
        </select>
        <input
          type="number"
          id="transaction-amount"
          placeholder="Valor"
          required
          min={0}
          value={valor}
          onChange={alteraValor}
        />
        <button
          type="submit"
          disabled={!contaIdSelecionada || !tipoTransacao || valor <= 0}
        >
          Realizar Operação
        </button>
      </form>
      {mensagemRetorno && <div>{mensagemRetorno}</div>}
      {erro && <div>{erro}</div>}
    </section>
  );
}
