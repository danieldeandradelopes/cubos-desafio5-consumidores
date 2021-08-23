import "./style.css";

import { useHistory } from "react-router-dom";
import { UseFetch } from "../../contexto/regraDeNegocio";

const CardRestaurante = ({ id, nome, descricao, preco, imagem }) => {
  const { restaurantes, gravarRestauranteLocal } = UseFetch();

  function gravarRestaurante() {
    const restaurante = restaurantes.filter((r) => r.id === id);
    gravarRestauranteLocal(restaurante[0]);
  }

  const history = useHistory();
  return (
    <div
      className="card"
      onClick={() => {
        gravarRestaurante();
        history.push(`/cardapio/${id}`);
      }}
    >
      <div className="card__front">
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p className="card__preco">$$</p>
        </div>
        <div className="card__imagem">
          <img src={imagem} alt="Logo restaurante" />
        </div>
      </div>
    </div>
  );
};

export default CardRestaurante;
