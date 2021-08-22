import "./style.css";

import { useHistory } from "react-router-dom";

const CardRestaurante = ({ id, nome, descricao, preco, imagem }) => {
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push(`/cardapio/${id}`)}>
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
