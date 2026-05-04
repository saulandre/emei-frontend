import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowLeft,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LinkVoltar = styled.div`
  margin-top: 5rem;
  color: #0d1b2a;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #e7ecef;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  padding: 20px;
`;

const AuthWrapper = styled.div`
  background-color: #e7ecef;
  border-radius: 5px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: #000;
  margin-bottom: 30px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 50px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: #d64042;
  }

  &:focus {
    border-color: #d64042;
    outline: none;
  }
`;

const StyledButton = styled.button`
  background-color: #d64042;
  color: #fff;
  padding: 10px 20px;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  height: 50px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessBanner = styled.p`
  margin-top: 1rem;
  padding: 12px;
  background: #e8f5e9;
  color: #1b5e20;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.45;
  text-align: center;
`;

const ErrorBanner = styled.p`
  margin-top: 1rem;
  padding: 12px;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.45;
  text-align: center;
`;

function getForgotPasswordErrorMessage(error) {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data && typeof data === "object") {
    const m =
      data.message ?? data.error ?? data.msg ?? data.detail;
    if (typeof m === "string" && m.trim()) return m;
  }
  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }
  return "Não foi possível enviar o e-mail de recuperação.";
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [successInfo, setSuccessInfo] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  useEffect(() => {
    let timer;
    if (disabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [disabled]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    setSuccessInfo(false);

    const email = (formData.email || "").trim();
    console.log("Forgot password submit:", email);

    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email,
      });
      console.log("Forgot password response:", response?.data);

      setDisabled(true);
      setSuccessInfo(true);

      toast.success(
        "Se o e-mail estiver cadastrado, enviaremos as instruções de redefinição.",
        {
          position: "bottom-center",
          autoClose: 5000,
        }
      );
    } catch (error) {
      const msg = getForgotPasswordErrorMessage(error);
      setSubmitError(msg);
      toast.error(msg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <Title>
          <FontAwesomeIcon icon={faLock} /> Redefinir Senha
        </Title>
        <form onSubmit={handleReset}>
          <StyledInput
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <StyledButton type="submit" disabled={loading || disabled}>
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : disabled ? (
              `Aguarde ${countdown}s`
            ) : (
              <>
                <FontAwesomeIcon icon={faEnvelope} /> Enviar e-mail
              </>
            )}
          </StyledButton>
        </form>
        {successInfo && (
          <SuccessBanner>
            Se o e-mail estiver cadastrado, enviaremos as instruções de
            redefinição.
          </SuccessBanner>
        )}
        {submitError && <ErrorBanner>{submitError}</ErrorBanner>}
        <LinkVoltar>
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar para o login
          </Link>
        </LinkVoltar>
      </AuthWrapper>
    </AuthContainer>
  );
};

export default ForgotPassword;
