import { useState, createContext } from "react";
import { useContext } from "react";
import { UseClientAuth } from "../autorizacao";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const [restaurantes, setRestaurantes] = useState([]);
  const [abrirCard, setAbrirCard] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [endereco, setEndereco] = useState();
  const { gravarConsumidor } = UseClientAuth();

  async function handleLoginConsumidor(data) {
    const body = JSON.stringify(data);

    const response = await fetch(
      "https://desafio5backconsumidor.herokuapp.com/login_consumidor",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      }
    );

    const login = await response.json();

    return login;
  }

  async function handleCadastroConsumidor(data) {
    const { nome, email, senha, confirmarSenha, telefone } = data;

    const dataRequerida = {
      nome,
      email,
      senha,
      telefone,
    };

    const body = JSON.stringify(dataRequerida);

    const response = await fetch(
      "https://desafio5backconsumidor.herokuapp.com/consumidores",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      }
    );

    const cadastro = await response.json();

    return cadastro;
  }

  const handleListarRestaurantes = async () => {
    const response = await fetch(
      "https://desafio5backconsumidor.herokuapp.com/restaurantes",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${gravarConsumidor.token}`,
        },
      }
    );
    const data = await response.json();
    setRestaurantes(data);
  };

  const handleExibirCardapio = async (id) => {
    const response = await fetch(
      `https://desafio5backconsumidor.herokuapp.com/restaurantes/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${gravarConsumidor.token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <FetchContext.Provider
      value={{
        abrirCard,
        setAbrirCard,
        handleLoginConsumidor,
        handleCadastroConsumidor,
        restaurantes,
        setRestaurantes,
        handleListarRestaurantes,
        carrinho,
        setCarrinho,
        endereco,
        setEndereco,
        handleExibirCardapio,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export function UseFetch() {
  const {
    abrirCard,
    setAbrirCard,
    handleLoginConsumidor,
    handleCadastroConsumidor,
    restaurantes,
    setRestaurantes,
    handleListarRestaurantes,
    carrinho,
    setCarrinho,
    endereco,
    setEndereco,
    handleExibirCardapio,
  } = useContext(FetchContext);

  return {
    abrirCard,
    setAbrirCard,
    handleLoginConsumidor,
    handleCadastroConsumidor,
    restaurantes,
    setRestaurantes,
    handleListarRestaurantes,
    carrinho,
    setCarrinho,
    endereco,
    setEndereco,
    handleExibirCardapio,
  };
}
