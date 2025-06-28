import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

import styled from "styled-components";
import axios from "axios";
const Container = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;
const TextInput = styled.input`
  width: 200px;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #d64042;
  }
`;

const FileUploadWrapper = styled.div`
  width: 100%;
  background-color: #d64042; 
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #374151;

  margin-bottom: 2rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 550px;
  
  
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
 

  
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #1f2937;
    width: 350px;
    text-align:center;
    display: flex;
justify-content: center;
align-items: center; 
      margin-left: auto;
  margin-right: auto;
`;

const QRImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-top:20px
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  
  text-align: center
`;

const PixInput = styled.input`
  width: 100%;
  font-size: 0.75rem;
  padding: 0.5rem;
  color: #374151;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  user-select: all;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #d64042;
    background: #fff;
  }
`;
const CardDescription = styled.p`
  font-size: 1rem;
  color: #666666;
`;
const InfoText = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const StrongText = styled.strong`
  color: #111827;
`;

const FileInput = styled.input`
  width: 200px;
  margin-bottom: 0.5rem;
`;
const cellStyleLeft = {
  padding: '12px 16px',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  textAlign: 'left',
};

const cellStyleRight = {
  padding: '12px 16px',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  textAlign: 'right',
};

const SendButton = styled.button`
  width: 200px;
  background-color: ${props => (props.disabled ? '#d64042' : '#d64042')};
  color: white;
  padding: 0.75rem;
  border: none;
  margin-top: 10px;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => (props.disabled ? '#f39c12' : '#f39c12')};
  }
`;

const FeedbackMessage = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
  color: ${props => (props.error ? '#dc2626' : '#16a34a')};
  font-weight: 600;
  min-height: 24px;
`;

const PaymentPage = () => {
 const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sending, setSending] = useState(false);
const [name, setName] = useState('');
const [tipo, ] = useState('');
const [tipoParticipacao, setTipoParticipacao] = useState('');
const [camisa, setCamisa] = useState(false);
const [tipoCamisa, setTipoCamisa] = useState(null); 
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFeedback(null); 
  };
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get('nome');
  const tipoParticipacao = params.get('tipoParticipacao');
  const camisaParam = params.get('camisa');
  const tipoCamisaParam = params.get('tipoCamisa'); // <- aqui

  if (nome) setName(nome);
  if (tipoParticipacao) setTipoParticipacao(tipoParticipacao);
  if (camisaParam) setCamisa(camisaParam === 'true');
  if (tipoCamisaParam) setTipoCamisa(tipoCamisaParam); // <- e aqui
}, []);



const handleSend = async () => {
  if (!file || !name) {
    setFeedback({ error: true, message: 'Preencha todos os campos antes de enviar.' });
    return;
  }

  const formData = new FormData();
  formData.append('nomeCompleto', name);
  formData.append('arquivo', file);

  try {
    setSending(true);

    const response = await axios.post(`${API_URL}/api/auth/enviar-comprovante`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setFeedback({ error: false, message: response.data.mensagem || 'Comprovante enviado com sucesso!' });
    setName('');
    setFile(null);
    document.getElementById('fileInput').value = ''; // limpa o input file
  } catch (err) {
    const msg = err.response?.data?.erro || 'Erro ao enviar. Tente novamente.';
    setFeedback({ error: true, message: msg });
  } finally {
    setSending(false);
  }
};

function renderCard() {
  if (tipoParticipacao === 'PC' && camisa === false) {
    return (
      <Card>
             <CardTitle>Você está pagando inscrição de Pequeno companheiro sem camisa do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Pequenos Companheiros</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 20,00</CardDescription>
      </td>
    </tr>
   
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 20,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>
        <QRImage src="/qrcode20.png" alt="QR Code Inscrição sem Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label>PIX Copia e Cola</Label>
        <br></br>
        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540520.005802BR5901N6001C62150511EMEIPROMO2063044231"
          onFocus={(e) => e.target.select()}
        />

                 <InfoText>
        
   <StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText>
      </Card>
    );
  }
  if ((tipoParticipacao === 'Confraternista') && camisa === false) {
    return (
      <Card>
    <CardTitle>Você está pagando inscrição de Confraternista do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Confraternista</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
 
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>
        <br></br>

        <QRImage src="/qrcode35.png" alt="QR Code Inscrição com Camisa" />
                <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label style={{color: '#000'}}>PIX Copia e Cola</Label>
                <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540535.005802BR5901N6001C62150511EMEIPROMO356304B3A9"
          onFocus={(e) => e.target.select()}
        />
           <InfoText>
        
   <StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText>
      </Card>
    );
  }

   if ((tipoParticipacao === 'Trabalhador') && camisa === false) {
    return (
      <Card>
    <CardTitle>Você está pagando inscrição de Confraternista do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Trabalhador</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
 
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>
        <br></br>

        <QRImage src="/qrcode35.png" alt="QR Code Inscrição com Camisa" />
                <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label style={{color: '#000'}}>PIX Copia e Cola</Label>
                <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540535.005802BR5901N6001C62150511EMEIPROMO356304B3A9"
          onFocus={(e) => e.target.select()}
        />
           <InfoText>
        
   <StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText>
      </Card>
    );
  }
  if (tipoParticipacao === 'PC' && camisa === true && tipoCamisa === 'preta') {
    return (
      <Card>
         <CardTitle>Você está pagando inscrição de Pequeno companheiro com camisa preta do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Pequenos Companheiros</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 20,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 30,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 50,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>
        <QRImage src="/qrcode-emei-60.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label>PIX Copia e Cola</Label>
                <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540560.005802BR5901N6001C62100506EMEI606304748D"
          onFocus={(e) => e.target.select()}
        />

                 <InfoText>
        
   <StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText>
      </Card>
    );
  }
  if (tipoParticipacao === 'PC' && camisa === true && tipoCamisa === 'branca') {
    return (
      <Card>
         <CardTitle>Você está pagando inscrição de Pequeno companheiro com camisa branca do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Pequenos Companheiros</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 20,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 30,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 50,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>
        <QRImage src="/qrcode500.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label>PIX Copia e Cola</Label>
                <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540550.005802BR5901N6001C62150511EMEIPROMO5063044DD5"
          onFocus={(e) => e.target.select()}
        />

                 <InfoText>
        
   <StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText>
      </Card>
    );
  }



  if ((tipoParticipacao === 'Trabalhador' || tipoParticipacao === 'Confraternista' ) && camisa === true && tipoCamisa === 'branca') {
    return (
      <Card>
        <CardTitle>Você está pagando inscrição com camisa preta do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Inscrição</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 30,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 65,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>




        <QRImage src="/qrcode65.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

                <Label>PIX Copia e Cola</Label>
        <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540565.005802BR5901N6001C62150511EMEIPROMO656304B8D5"
          onFocus={(e) => e.target.select()}
        />
      </Card>
    );
  }

    if ((tipoParticipacao === 'Trabalhador' || tipoParticipacao === 'Confraternista') && camisa === true && tipoCamisa === 'preta') {
    return (
      <Card>
        <CardTitle>Você está pagando inscrição com camisa preta do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Inscrição</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa preta</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 40,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 75,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>




        <QRImage src="/qrcode75.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

                <Label>PIX Copia e Cola</Label>
        <br></br>

        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540575.005802BR5901N6001C62150511EMEIPROMO756304BA99"
          onFocus={(e) => e.target.select()}
        />
      </Card>
    );
  }



/*     if ((tipoParticipacao === 'Confraternista')  && camisa === true && tipoCamisa === 'preta') {
    return (
      <Card>
        <CardTitle>Você está pagando inscrição de Confraternista com camisa preta do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Confraternista</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 30,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 65,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>




        <QRImage src="/qrcode65.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label >PIX Copia e Cola</Label>
        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540565.005802BR5901N6001C62150511EMEIPROMO656304B8D5"
          onFocus={(e) => e.target.select()}
        />
      </Card>
    );
  }

      if ((tipoParticipacao === 'Confraternista')  && camisa === true && tipoCamisa === 'branca') {
    return (
      <Card>
        <CardTitle>Você está pagando inscrição de Confraternista com camisa branca do encontro do EMEI 2025</CardTitle>
<table
  style={{
    width: '100%',
    color: '#000',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <tbody>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Confraternista</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 35,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <td style={cellStyleLeft}>
        <CardDescription>Camisa</CardDescription>
      </td>
      <td style={cellStyleRight}>
        <CardDescription>R$ 30,00</CardDescription>
      </td>
    </tr>
    <tr style={{ backgroundColor: '#e4e4e4', borderRadius: '8px' }}>
      <td style={{ ...cellStyleLeft, fontWeight: 'bold' }}>
        <CardDescription>Total</CardDescription>
      </td>
      <td style={{ ...cellStyleRight, fontWeight: 'bold' }}>
        <CardDescription>R$ 65,00</CardDescription>
      </td>
    </tr>
  </tbody>
</table>




        <QRImage src="/qrcode65.png" alt="QR Code Inscrição com Camisa" />
                        <CardDescription style={{color: '#000'}}>ou</CardDescription>

        <Label >PIX Copia e Cola</Label>
        <PixInput
          readOnly
          value="00020126520014BR.GOV.BCB.PIX0130polo20_genesare@comeerj.com.br520400005303986540565.005802BR5901N6001C62150511EMEIPROMO656304B8D5"
          onFocus={(e) => e.target.select()}
        />
      </Card>
    );
  } */


  return null; 
}

  return (
    
    <Container>
      <Title>PAGAMENTO DA INSCRIÇÃO</Title>
 <FileUploadWrapper>

    <Label htmlFor="nameInput"><b>1º passo</b> - você deve confirmar se o nome do inscrito está correto</Label>
    <br></br>
<TextInput
  id="nameInput"
  type="text"
  placeholder="Digite seu nome completo"
  value={name}
  readOnly
  onChange={(e) => setName(e.target.value)}
  disabled={sending}
/>
</FileUploadWrapper>
 <br></br> <br></br>

 <Label style={{ color: "#000", fontWeight: "600" }}>
  <b>2º passo</b> - Você deve realizar o pagamento com a chave PIX abaixo.
</Label>
<br></br><br></br>
<CardsGrid>
  {renderCard()}
</CardsGrid>

{/* 
      <InfoText>
        
        <StrongText>Chave PIX:</StrongText> polo20_genesare@comeerj.com.br <br></br><StrongText>Titular:</StrongText> CEERJ - Conselho Espírita do Estado Rio de Janeiro
      </InfoText> */}
      <br></br>
       
  <FileUploadWrapper>
  <Label htmlFor="fileInput"><b>3º passo</b> - clique em <b>ESCOLHER ARQUIVO</b> para anexar o comprovante! ✨🤩✨</Label>
 <br></br>
  <FileInput
    id="fileInput"
    type="file"
    readOnly
    onChange={handleFileChange}
    disabled={sending}
    accept="image/*,.pdf"
  />
</FileUploadWrapper>

      {file && <InfoText>Arquivo selecionado: <StrongText>{file.name}</StrongText></InfoText>}
        <CardTitle style={{marginTop: '50px'}}><b>4º passo</b> - Enviar o comprovante 👇</CardTitle>

<SendButton
  disabled={!file || sending}
  onClick={handleSend}
  style={{ background: "#d64042", color: "white" }}
>
  {sending ? "Finalizando..." : "Finalizar"}
</SendButton>

      <FeedbackMessage error={feedback?.error}>
        {feedback?.message || "\u00A0" /* espaço para manter altura */}
      </FeedbackMessage>
    </Container>
  );
};

export default PaymentPage;
