import { ContasContext } from "@/app/contexts/ContasContext";
import { IApiError } from "@/app/interface/ApiError";
import { saldoContaService } from "@/app/service/service";
import React, { useContext, useEffect, useState } from "react";

export default function Saldo() {
  const { contas } = useContext(ContasContext);
  const [idContaSelecionada, setIdContaSelecionada] = useState<number | null>(
    null
  );
  const [saldo, setSaldo] = useState<number | null>(null);
  const [error, setError] = useState<IApiError | null>(null);

  const selecionaConta = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const contaId = parseInt(event.target.value);
    setIdContaSelecionada(contaId);
  };

  useEffect(() => {
    const fetchSaldo = async () => {
      if (idContaSelecionada) {
        try {
          const response = await saldoContaService(idContaSelecionada);
          if (typeof response === "number") {
            setSaldo(response);
          } else {
            setError(response as IApiError);
          }
        } catch (error: any) {
          setError(error as IApiError); 
          setSaldo(null);
        }
      }
    };

    fetchSaldo();
  }, [idContaSelecionada]);

  return (
    <section className="balance-section">
      <h2>Consulta de Saldos</h2>
      <form id="balance-form">
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
      {error ? (
        <div id="balance-result">Erro: {error.message}</div>
      ) : saldo !== null ? (
        <div id="balance-result">Saldo: {saldo}</div>
      ) : (
        <div id="balance-result">Selecione uma conta para ver o saldo.</div>
      )}
    </section>
  );
}
