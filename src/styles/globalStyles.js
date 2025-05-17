// src/globalStyles.js

import { createGlobalStyle } from 'styled-components';

 const GlobalStyles = createGlobalStyle`
  /* Definição das cores */
  :root {
  
    --secondary-gold: #f39c12;
 
   
  }

  /* Reset básico */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif;
    background-color: var(--background);
    color: var(--text-color);
    overflow-y: auto  }

  a {
    text-decoration: none;
    color: var(--primary-purple);
  }

  a:hover {
    color: var(--secondary-gold);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-purple);
  }

  p {
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background: var(--primary-purple);
    color: #fff;
    padding: 12px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  button:hover {
    background: var(--secondary-gold);
  }

  input, textarea {
    font-family: inherit;
    padding: 8px;
    border: 1px solid var(--border-color);
    outline: none;
    border-radius: 4px;
  }

  input:focus, textarea:focus {
    border-color: var(--primary-purple);
  }
  
  /* Estilização do container principal */
  .container {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export default GlobalStyles;