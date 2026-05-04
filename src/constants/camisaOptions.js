/** Valores persistidos em tipoCamisa (compatível com legado branca/preta). */

export const TIPO_CAMISA_POLYESTER_BRANCA = "poliester_branca";
export const TIPO_CAMISA_ALGODAO_BRANCA = "algodao_branca";
export const TIPO_CAMISA_ALGODAO_PRETA = "algodao_preta";

export const OPCOES_TIPO_CAMISA = [
  {
    value: TIPO_CAMISA_POLYESTER_BRANCA,
    label: "Camisa Poliéster Branca — R$ 30,00",
  },
  {
    value: TIPO_CAMISA_ALGODAO_BRANCA,
    label: "Camisa Algodão Branca — R$ 50,00",
  },
  {
    value: TIPO_CAMISA_ALGODAO_PRETA,
    label: "Camisa Algodão Preta — R$ 50,00",
  },
];

/** Preço da camisa (poliéster 30; algodão branca/preta 50; legado branca/preta alinhados ao tabela EMEI). */
export function precoTipoCamisa(tipo) {
  if (!tipo) return 0;
  switch (tipo) {
    case TIPO_CAMISA_POLYESTER_BRANCA:
    case "branca":
      return 30;
    case TIPO_CAMISA_ALGODAO_BRANCA:
    case TIPO_CAMISA_ALGODAO_PRETA:
    case "preta":
      return 50;
    default:
      return 0;
  }
}

export function normalizeTipoCamisaFromApi(tipo) {
  if (tipo == null || tipo === "") return "";
  const t = String(tipo);
  if (
    t === TIPO_CAMISA_POLYESTER_BRANCA ||
    t === TIPO_CAMISA_ALGODAO_BRANCA ||
    t === TIPO_CAMISA_ALGODAO_PRETA
  ) {
    return t;
  }
  if (t === "branca") return TIPO_CAMISA_POLYESTER_BRANCA;
  if (t === "preta") return TIPO_CAMISA_ALGODAO_PRETA;
  return t;
}

export function isCamisaPreta(tipo) {
  return tipo === TIPO_CAMISA_ALGODAO_PRETA || tipo === "preta";
}

export function isCamisaBrancaPoliester(tipo) {
  return tipo === TIPO_CAMISA_POLYESTER_BRANCA || tipo === "branca";
}

export function isCamisaBrancaAlgodao(tipo) {
  return tipo === TIPO_CAMISA_ALGODAO_BRANCA;
}

/** Texto curto para impressão / resumo (inclui legado branca/preta). */
export function textoResumoCamisa(camisa, tipoCamisa, tamanhoCamisa) {
  if (!camisa) return "Não";
  const op = OPCOES_TIPO_CAMISA.find((o) => o.value === tipoCamisa);
  const tipoTxt = op
    ? op.label.split("—")[0].trim()
    : tipoCamisa === "branca"
      ? "Poliéster branca (registo anterior)"
      : tipoCamisa === "preta"
        ? "Preta (registo anterior)"
        : tipoCamisa || "—";
  return `Sim (${tipoTxt}; tamanho: ${tamanhoCamisa || "—"})`;
}
