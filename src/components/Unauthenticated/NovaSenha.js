import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AuthContainer,
  AuthWrapper,
  Title,
  StyledInput,
  StyledButton,
  LinkVoltar,
} from "./SharedAuthStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  validatePassword,
  PASSWORD_POLICY_MESSAGE,
} from "../../utils/passwordPolicy";

/** Lê ?token= da URL, decodifica uma vez se necessário e valida formato JWT (3 segmentos). */
function readResetJwtFromSearchParams(searchParams) {
  const raw = searchParams.get("token");
  if (raw == null || typeof raw !== "string") return null;
  let t = raw.trim();
  if (!t) return null;
  try {
    t = decodeURIComponent(t);
  } catch {
    /* já decodificado ou string inválida para decode — mantém t */
  }
  t = t.trim().replace(/\u00a0/g, "");
  const parts = t.split(".");
  if (parts.length !== 3 || parts.some((p) => !p.length)) return null;
  return t;
}

const NovaSenha = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = useMemo(
    () => readResetJwtFromSearchParams(searchParams),
    [searchParams]
  );

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!token) {
      toast.error("Token inválido ou ausente.");
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenToSend = readResetJwtFromSearchParams(searchParams);
    if (!tokenToSend) {
      toast.error("Token inválido ou ausente.");
      return;
    }

    const password = formData.newPassword;

    if (password !== formData.confirmPassword) {
      return toast.error("As senhas não coincidem.");
    }

    if (!validatePassword(password)) {
      return toast.error(PASSWORD_POLICY_MESSAGE);
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        token: tokenToSend,
        newPassword: password,
      });

      toast.success("Senha redefinida com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <Title>
          <FontAwesomeIcon icon={faLock} /> Criar Nova Senha
        </Title>
        <form onSubmit={handleSubmit}>
          <StyledInput
            type="password"
            name="newPassword"
            placeholder="Nova senha"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="password"
            name="confirmPassword"
            placeholder="Confirmar nova senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Redefinir Senha"}
          </StyledButton>
        </form>
        <LinkVoltar>
          <a href="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar ao login
          </a>
        </LinkVoltar>
      </AuthWrapper>
    </AuthContainer>
  );
};

export default NovaSenha;
