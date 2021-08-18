import "./style.css";

import { ReactComponent as SifraoIcon } from "../../assets/sifrao.svg";
import { ReactComponent as TimeIcon } from "../../assets/time.svg";

const Cardapio = () => {
  return (
    <div className="cardapio">
      <div className="cardapio__btn__revisar">
        <button>Revisar Pedido</button>
      </div>
      <div className="cardapio__info">
        <div className="flex-row content-center">
          <SifraoIcon />
          <span>Pedido Mínimo:</span>
          <p>R$</p>
        </div>
        <div className="flex-row content-center ">
          <TimeIcon />
          <span>Tempo de Entrega:</span>
          <p></p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Cardapio;
