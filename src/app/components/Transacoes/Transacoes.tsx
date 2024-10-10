import { ContasContext } from "@/app/contexts/ContasContext";
import { IHistoricoTransacao } from "@/app/interface/IHistoricoTransacao";
import { listarTransacoesService } from "@/app/service/service";
import React, { useContext, useEffect, useState } from "react";

export default function Transacoes() {
  const { contas } = useContext(ContasContext);
  const [idContaSelecionada, setIdContaSelecionada] = useState<number | null>(
    null
  );
  const [transacoes, setTransacoes] = useState<IHistoricoTransacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchExtrato = async () => {
      if (idContaSelecionada) {
        try {
          const listaTransacoes = await listarTransacoesService(idContaSelecionada);
          if (Array.isArray(listaTransacoes)) setTransacoes(listaTransacoes);
        } catch (error: any) {
          setErro(error.mensagem);
        }
      }
    };

    fetchExtrato();
  }, [idContaSelecionada]);

  const tipoTransacao = (transacaoTipo: string | undefined) => {
    try {
      switch (Number(transacaoTipo)) {
        case 0:
          return "Crédito";
        case 1:
          return "Débito";
        case 2:
          return "Transferência";
        default:
          return "Erro";
      }
    } catch {
      return "Erro";
    }
  };

  const selecionaConta = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const contaId = parseInt(event.target.value);
    setIdContaSelecionada(contaId);
  };

  return (
    <section className="history-section">
      <h2>Histórico de Transações</h2>
      <form id="history-form">
        <select
          id="transaction-type"
          value={idContaSelecionada || 0}
          onChange={selecionaConta}
        >
          <option value="">Selecione uma conta</option>
          {contas.map((conta) => (
            <option key={conta.id} value={conta.id}>
              {conta.nome}
            </option>
          ))}
        </select>
      </form>
      <div id="history-result">
        <table id="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((itemTransacao) => (
              <tr>
                <td>{itemTransacao.id}</td>
                <td>{tipoTransacao(itemTransacao.tipo)}</td>
                <td>{itemTransacao.valor}</td>
                <td>{itemTransacao.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {erro && <p>{erro}</p>}
    </section>
  );
}
