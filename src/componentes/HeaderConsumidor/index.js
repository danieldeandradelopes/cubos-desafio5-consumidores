import "./style.css";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";

import Logo from "../../assets/logo_padrao.png";

import { UseClientAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const HeaderConsumidor = () => {
  const history = useHistory();
  const { id_restaurante } = useParams();
  const [restauranteLocal, gravarRestauranteLocal, removerRestauranteLocal] =
    useLocalStorage("dadosRestaurante", "");
  const { setAbrirCard, restaurantes, setEndereco } = UseFetch();
  const path = window.location.pathname;

  const { removeGravarConsumidor } = UseClientAuth();

  const handleLogout = () => {
    removeGravarConsumidor();
    removerRestauranteLocal();
    setEndereco(null);
    history.push("/consumidor-login");
  };

  useEffect(() => {
    const restaurante =
      id_restaurante &&
      restaurantes.filter((r) => r.id === Number(id_restaurante));
    gravarRestauranteLocal(restaurante && restaurante[0]);
  }, []);

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
        onClick={() => setAbrirCard(true)}
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
