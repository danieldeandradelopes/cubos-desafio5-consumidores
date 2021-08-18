import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo_padrao.png";

import { UseClientAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const HeaderConsumidor = () => {
  const history = useHistory();

  const { removeGravarConsumidor } = UseClientAuth();
  const { setAbrirCard } = UseFetch();

  const handleLogout = () => {
    removeGravarConsumidor();
    history.push("/consumidor-login");
  };

  return (
    <header className="header__consumidor">
      <img
        src={Logo}
        className="header__logo"
        alt="Logo"
        onClick={() => setAbrirCard(true)}
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <h1 className="nome_restaurante"></h1>
        <button onClick={() => handleLogout()}>
          <span className="logout_btn">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderConsumidor;
