import { useState, createContext } from "react";
import { useContext } from "react";
import { useLocalStorage } from "react-use";
import { UseClientAuth } from "../autorizacao";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const [restaurantes, setRestaurantes] = useState([]);
  const [abrirCard, setAbrirCard] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [endereco, setEndereco] = useState();
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [quantidade, setQuantidade] = useState(0);
  const [abrirEndereco, setAbrirEndereco] = useState(false);
  const { gravarConsumidor } = UseClientAuth();
  const [itemClick, setItemClick] = useState({
    id: "",
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
  });
  const [restauranteLocal, gravarRestauranteLocal, removerRestauranteLocal] =
    useLocalStorage("dadosRestaurante", "");

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

  const handleEndereco = async (data) => {
    const body = JSON.stringify(data);
    const response = await fetch(
      "https://desafio5backconsumidor.herokuapp.com/add_endereco",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${gravarConsumidor.token}`,
        },
        body,
      }
    );
    const result = await response.json();
    return result;
  };

  const handlePedido = async (data) => {
    const produtos = JSON.stringify(data);
    const produtosFormatados = { produtos: produtos };
    const body = JSON.stringify(produtosFormatados);

    const response = await fetch(
      `https://desafio5backconsumidor.herokuapp.com/restaurantes/${restauranteLocal.id}/pedidos`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${gravarConsumidor.token}`,
        },
        body,
      }
    );
    const result = await response.json();
    return result;
  };

  return (
    <FetchContext.Provider
      value={{
        abrirCard,
        setAbrirCard,
        quantidade,
        setQuantidade,
        handleLoginConsumidor,
        handleCadastroConsumidor,
        restaurantes,
        setRestaurantes,
        handleListarRestaurantes,
        carrinho,
        setCarrinho,
        endereco,
        setEndereco,
        abrirCarrinho,
        setAbrirCarrinho,
        handleExibirCardapio,
        abrirEndereco,
        setAbrirEndereco,
        handleEndereco,
        handlePedido,
        restauranteLocal,
        gravarRestauranteLocal,
        removerRestauranteLocal,
        itemClick,
        setItemClick,
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
    quantidade,
    setQuantidade,
    handleLoginConsumidor,
    handleCadastroConsumidor,
    restaurantes,
    setRestaurantes,
    handleListarRestaurantes,
    carrinho,
    setCarrinho,
    endereco,
    setEndereco,
    abrirCarrinho,
    setAbrirCarrinho,
    handleExibirCardapio,
    abrirEndereco,
    setAbrirEndereco,
    handleEndereco,
    handlePedido,
    restauranteLocal,
    gravarRestauranteLocal,
    removerRestauranteLocal,
    itemClick,
    setItemClick,
  } = useContext(FetchContext);

  return {
    abrirCard,
    setAbrirCard,
    quantidade,
    setQuantidade,
    handleLoginConsumidor,
    handleCadastroConsumidor,
    restaurantes,
    setRestaurantes,
    handleListarRestaurantes,
    carrinho,
    setCarrinho,
    endereco,
    setEndereco,
    abrirCarrinho,
    setAbrirCarrinho,
    handleExibirCardapio,
    abrirEndereco,
    setAbrirEndereco,
    handleEndereco,
    handlePedido,
    restauranteLocal,
    gravarRestauranteLocal,
    removerRestauranteLocal,
    itemClick,
    setItemClick,
  };
}
