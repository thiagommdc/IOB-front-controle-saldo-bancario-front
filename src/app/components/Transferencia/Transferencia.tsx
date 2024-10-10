import { ContasContext } from "@/app/contexts/ContasContext";
import { ITransferencia } from "@/app/interface/ITransferencia";
import { transferirService } from "@/app/service/service";
import React, { useContext, useState } from "react";

export default function Transferencia() {
  const { contas } = useContext(ContasContext);

  const [contaOrigem, setContaOrigem] = useState<number | null>(null);
  const [contaDestino, setContaDestino] = useState<number | null>(null);
  const [valor, setValor] = useState<number>(0);

  const handleTransferencia = async () => {
    if (
      !contaOrigem ||
      !contaDestino ||
      valor <= 0 ||
      contaOrigem == contaDestino
    ) {
      debugger
      alert("Selecione contas diferentes e informe um valor válido.");
      return;
    }

    const dadosTransferencia: ITransferencia = {
      ContaOrigemId: contaOrigem,
      ContaDestinoId: contaDestino,
      Valor: valor,
    };

    try {
      const resultado = await transferirService(dadosTransferencia);
      if (typeof resultado === "string") {
        alert(resultado);
      } else {
        alert("Ocorreu um erro ao realizar a transferência.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro inesperado.");
    }
  };

  return (
    <section className="transfer-section">
      <h2>Transferência Bancária</h2>
      <select
        id="conta-origem"
        value={contaOrigem || 0}
        onChange={(e) => setContaOrigem(Number(e.target.value))}
      >
        <option value="">Conta Origem</option>
        {contas.map((conta) => (
          <option key={conta.id} value={conta.id}>
            {conta.nome}
          </option>
        ))}
      </select>
      <select
        id="conta-destino"
        value={contaDestino || 0}
        onChange={(e) => setContaDestino(Number(e.target.value))}
      >
        <option value="">Conta Destino</option>
        {contas.map((conta) => (
          <option key={conta.id} value={conta.id}>
            {conta.nome}
          </option>
        ))}
      </select>
      <input
        type="number"
        id="transfer-amount"
        placeholder="Valor"
        onChange={(e) => setValor(Number(e.target.value))}
        required
      ></input>
      <button type="button" onClick={handleTransferencia}>
        Realizar Transferência
      </button>
    </section>
  );
}
