import "./style.css";

import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo_padrao.png";

import { UseClientAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const HeaderConsumidor = () => {
  const history = useHistory();

  const {
    setEndereco,
    restauranteLocal,

    removerRestauranteLocal,
    setCarrinho,
  } = UseFetch();
  const path = window.location.pathname;

  const { removeGravarConsumidor } = UseClientAuth();

  const handleLogout = () => {
    removeGravarConsumidor();
    removerRestauranteLocal();
    setCarrinho(0);
    setEndereco("");
    history.push("/consumidor-login");
  };

  return (
    <header className="header__consumidor">
      <img
        src={
          path.includes("cardapio") && restauranteLocal.imagem
            ? restauranteLocal.imagem
            : Logo
        }
        className="header__logo"
        alt="Logo"
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <h1 className="nome_restaurante">
          {path.includes("cardapio") ? restauranteLocal.nome : "Restaurantes"}
        </h1>
        <button onClick={() => handleLogout()}>
          <span className="logout_btn">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderConsumidor;
