import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.97);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.45);
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 0.75rem;
  }
`;

const ScrollShell = styled.div`
  width: 100%;
  max-width: min(90vw, 44rem);
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.28s ease
    forwards;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 92vh;
  }
`;

const MainCard = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow:
    0 4px 6px rgba(15, 23, 42, 0.04),
    0 12px 40px rgba(15, 23, 42, 0.12);
  padding: 2rem 2.25rem 1.75rem;
  font-family: "Poppins", sans-serif;
  color: #1e293b;
  line-height: 1.65;

  @media (max-width: 768px) {
    padding: 1.5rem 1.1rem 1.25rem;
    border-radius: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  color: #475569;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
  z-index: 1;

  &:hover {
    background: rgba(15, 23, 42, 0.1);
    color: #0f172a;
  }
`;

const OrgStack = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
`;

const OrgLine = styled.p`
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #64748b;
  line-height: 1.5;

  @media (min-width: 480px) {
    font-size: 0.72rem;
  }
`;

const DocSection = styled.section`
  margin-top: 1.35rem;
  padding-top: 1.35rem;
  border-top: 1px solid rgba(148, 163, 184, 0.35);

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`;

const SectionHeading = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
`;

const Paragraph = styled.p`
  margin: 0 0 0.65rem;
  font-size: 0.92rem;
  color: #475569;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ThemeHighlight = styled.div`
  margin-top: 0.35rem;
  padding: 1.15rem 1.25rem;
  border-radius: 0.9rem;
  background: linear-gradient(
    145deg,
    rgba(30, 41, 59, 0.06) 0%,
    rgba(241, 245, 249, 0.95) 100%
  );
  border: 1px solid rgba(100, 116, 139, 0.35);
  text-align: left;
`;

const ThemeTitle = styled.p`
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #0f172a;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const InvestimentoBox = styled.div`
  margin: 0.75rem 0 1rem;
  padding: 1rem 1.15rem;
  border-radius: 0.85rem;
  background: rgba(214, 64, 66, 0.08);
  border: 1px solid rgba(214, 64, 66, 0.22);
`;

const InvestimentoBoxTitle = styled.p`
  margin: 0 0 0.55rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #b91c1c;
`;

const InvestimentoLine = styled.p`
  margin: 0 0 0.4rem;
  font-size: 0.92rem;
  color: #1e293b;
  font-weight: 500;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PagamentoBox = styled.div`
  margin: 0.75rem 0 1rem;
  padding: 1rem 1.15rem;
  border-radius: 0.85rem;
  background: rgba(30, 64, 175, 0.06);
  border: 1px solid rgba(30, 64, 175, 0.2);
`;

const PagamentoBoxTitle = styled.p`
  margin: 0 0 0.55rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1d4ed8;
`;

const PagamentoBody = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #334155;
  word-break: break-word;
  line-height: 1.6;
`;

const AlertParagraph = styled.p`
  margin: 0.75rem 0 0.5rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #334155;
  line-height: 1.55;
`;

const FooterClose = styled.button`
  display: block;
  width: 100%;
  margin-top: 1.75rem;
  padding: 0.85rem;
  border: none;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.06);
  color: #334155;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.09);
  }
`;

export const PlanoGeralLink = styled.span`
  color: #1d4ed8;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #1e40af;
  }
`;

/**
 * Texto do plano geral renderizado na íntegra conforme documento institucional
 * (apenas estrutura visual: parágrafos, secções, caixas de destaque).
 */
export function PlanoGeralEMEIContent() {
  return (
    <>
      <OrgStack>
        <OrgLine>23º CONSELHO ESPÍRITA DE UNIFICAÇÃO - 23º CEU</OrgLine>
        <OrgLine>ÁREA DA EDUCAÇÃO ESPÍRITA</OrgLine>
        <OrgLine>SERVIÇO DE EVANGELIZAÇÃO DA FAMÍLIA - SEF</OrgLine>
        <OrgLine>ENCONTRO DE MOCIDADES ESPÍRITAS EM IRAJÁ - EMEI</OrgLine>
      </OrgStack>

      <DocSection>
        <SectionHeading>1. Dados de Identificação</SectionHeading>
        <Paragraph>
          1.1 Evento: Encontro de Mocidades Espíritas em Irajá - EMEI.
        </Paragraph>
        <Paragraph>
          1.2 Promoção: Área da Educação Espírita do 23º CEU / CEERJ.
        </Paragraph>
        <Paragraph>1.3 Execução: Coordenação Geral.</Paragraph>
        <Paragraph>1.4 Período: 27 e 28 de junho de 2026</Paragraph>
        <Paragraph>1.5 Local: Grupo Espírita Esperança em Cristo</Paragraph>
        <Paragraph>1.6 Público-Alvo:</Paragraph>
        <Paragraph>
          Confraternistas: Jovens espíritas de 11 a 21 anos completos até a
          data do evento, que estejam frequentando as reuniões do Setor de
          Juventude de uma Instituição Espírita há pelo menos 1 ano até a data
          da inscrição, com 70% de presença.
        </Paragraph>
        <Paragraph>
          Tarefeiros do Bem: Espíritas de 22 a 26 anos completos até a data do
          evento, vinculados ao Setor de Juventude ou a outro setor de uma
          Instituição Espírita há no mínimo 1 ano, com 70% de frequência. Este
          grupo, além das atividades de estudo, poderá participar de
          atividades nas Equipes, como estágio e trabalho voluntário.
        </Paragraph>
        <Paragraph>
          Membros de Equipe: Espíritas a partir de 18 anos, até a data do
          evento, que estejam participando ativamente há pelo menos 1 ano de
          uma Instituição Espírita. Ao se inscrever, o participante deve listar
          as tarefas que tem habilidade para desempenhar, colocando-se à
          disposição da Coordenação Geral para atuação em alguma equipe. Para
          participar da Equipe de Estudos, é necessário estar atuando como
          evangelizador de algum Ciclo de Juventude ou da Infância (no caso de
          evangelizar os Pequenos Companheiros).
        </Paragraph>
        <Paragraph>
          Pequenos Companheiros: Filhos de Membros de Equipe, de 2 a 10 anos de
          idade na data do evento, poderão participar da programação
          previamente elaborada em consonância com o tema central.
        </Paragraph>
        <Paragraph>
          Demais CEUs/CEERJ: Serão aceitas inscrições de outros CEUs, desde que
          atendam a todos os critérios estabelecidos para Confraternistas,
          Tarefeiros do Bem, Pais e Membros de Equipe. A ficha de inscrição deve
          ser assinada pelo presidente da Instituição Espírita à qual pertençam.
        </Paragraph>
      </DocSection>

      <DocSection>
        <SectionHeading>2. Objetivo</SectionHeading>
        <Paragraph>
          2.1 Oferecer aos participantes condições que os levem:
        </Paragraph>
        <Paragraph>
          À valorização do estudo sistemático da Doutrina Espírita.
        </Paragraph>
        <Paragraph>
          À sensibilização para a vivência dos ensinamentos cristãos, consigo
          mesmo, perante a família, a Instituição Espírita e a sociedade.
        </Paragraph>
        <Paragraph>
          Fortalecer a unificação do Movimento Espírita local.
        </Paragraph>
        <Paragraph>
          2.2 Intensificar a Unificação do Movimento Espírita da região.
        </Paragraph>
      </DocSection>

      <DocSection>
        <SectionHeading>3. Metodologias de Ação</SectionHeading>
        <Paragraph>REUNIÕES DE ESTUDO</Paragraph>
        <Paragraph>ATIVIDADES COMPLEMENTARES</Paragraph>
        <Paragraph>ATIVIDADES DE DESENVOLVIMENTO INTERPESSOAL</Paragraph>
      </DocSection>

      <DocSection>
        <ThemeHighlight>
          <ThemeTitle>
            4. Tema Central: ESPIRITISMO: O QUE ME ATRAI E O QUE ME AFASTA
          </ThemeTitle>
        </ThemeHighlight>
      </DocSection>

      <DocSection>
        <SectionHeading>5. Inscrições</SectionHeading>
        <Paragraph>5.1 PERÍODO DE INSCRIÇÃO:</Paragraph>
        <Paragraph>
          *** ****(Podendo sofrer alterações no decorrer do prazo em virtude da
          limitação máxima).
        </Paragraph>
        <InvestimentoBox>
          <InvestimentoBoxTitle>5.2 Investimento</InvestimentoBoxTitle>
          <InvestimentoLine>
            R$ 65,00 — Confraternistas, Tarefeiros, Pais e Membros de Equipe
          </InvestimentoLine>
          <InvestimentoLine>R$ 50,00 — Pequenos Companheiros</InvestimentoLine>
          <InvestimentoLine>
            R$ 35,00 (poliester) ou 50,00 (algodão) — Camisa com o tema do evento (Opcional)
          </InvestimentoLine>
        </InvestimentoBox>
        <Paragraph>
          Observação 1: Este investimento destina-se às despesas de alimentação,
          material do estudo, material de limpeza e a materiais diversos
          necessários para a realização da Comejaca.
        </Paragraph>
        <Paragraph>
          Observação 2: Todos deverão contribuir com a importância acima
          mencionada até a data limite da inscrição, e qualquer dificuldade
          deverá ser resolvida pela Instituição Espírita da qual o participante
          participe, que então repassará para a Coordenação Geral, através de
          um comunicado por escrito.
        </Paragraph>
        <PagamentoBox>
          <PagamentoBoxTitle>5.5 DA CONTRIBUIÇÃO:</PagamentoBoxTitle>
          <PagamentoBody>
            PIX (E-mail): polo20_genesare@comeerj.com.br ou através da Agência:
            3836-9 (Mangaratiba) e Conta Poupança: 200.020-2 (Variação 51) ,
            Banco do Brasil (341). Favorecido: Conselho Espírita do Est. Rio de
            Janeiro. O comprovante deverá ser enviado por e-mail:
            emeiiraja23@gmail.com ou pelo site de Inscrição com a informação
            dos beneficiários deste pagamento. O pagamento deverá ser feito até
            o dia *******
          </PagamentoBody>
        </PagamentoBox>
        <AlertParagraph>
          5.6 NÃO SERÃO ACEITAS INSCRIÇÕES APÓS O DIA ******, E NEM SERÃO
          FEITAS INSCRIÇÕES NO LOCAL DO EVENTO.
        </AlertParagraph>
        <AlertParagraph>
          5.7 A INSCRIÇÃO É PESSOAL E INTRANSFERÍVEL, NÃO SENDO PERMITIDAS
          SUBSTITUIÇÕES.
        </AlertParagraph>
        <Paragraph>5.8 CONFIRMAÇÃO:</Paragraph>
        <Paragraph>
          5.8.1 CONFIRMAÇÃO: Confraternistas, Tarefeiros do Bem, Peq.
          Companheiros e Pais: Através de comunicação da Coordenação Geral
          diretamente para os participantes via e-mail.
        </Paragraph>
        <Paragraph>
          5.8.2 Membros de Equipe: Através da participação nas Reuniões Gerais e
          nas reuniões de Equipe.
        </Paragraph>
        <Paragraph>
          Observação 1: Procurar saber as datas das reuniões das equipes e
          cuidar de frequentá-las assiduamente (mínimo 70%), garantindo assim o
          seu direito de participar do EMEI.
        </Paragraph>
      </DocSection>
    </>
  );
}

function PlanoGeralEMEIModal({ isOpen, onClose }) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 280);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <ModalOverlay isVisible={visible}>
      {visible && (
        <ScrollShell isVisible={isOpen}>
          <MainCard>
            <CloseButton type="button" onClick={onClose} aria-label="Fechar">
              ✕
            </CloseButton>
            <PlanoGeralEMEIContent />
            <FooterClose type="button" onClick={onClose}>
              Fechar
            </FooterClose>
          </MainCard>
        </ScrollShell>
      )}
    </ModalOverlay>
  );
}

export default PlanoGeralEMEIModal;
