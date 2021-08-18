import "./style.css";

import TagPedidoMinimo from "../TagPedidoMinimo";
import TagTempoEntrega from "../TagTempoEntrega";

import CardProduto from "../../componentes/CardProduto";

const Cardapio = () => {
  return (
    <div className="cardapio">
      <div className="cardapio__btn__revisar">
        <button>Revisar Pedido</button>
      </div>
      <div className="cardapio__info">
        <TagPedidoMinimo />
        <TagTempoEntrega />
      </div>
      <div className="cardapio__lista__produtos">
        <CardProduto />
      </div>
    </div>
  );
};

export default Cardapio;
