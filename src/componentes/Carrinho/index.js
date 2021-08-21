import "./style.css";
import { ReactComponent as CarrinhoSVG } from "../../assets/carrinho.svg";
import { UseFetch } from "../../contexto/regraDeNegocio";
import carrinhoVazio from "../../assets/carrinho-vazio.png";
import ItemCarrinho from "./ItemCarrinho";
import { Link } from "react-router-dom";

function Carrinho() {
  const { carrinho } = UseFetch();
  return (
    <div className="overlay">
      <div className="modal_carrinho">
        <div>
          <CarrinhoSVG />
          <h1 className="restaurante-carrinho">Nome Restaurante</h1>
        </div>
        <div>
          <spam>
            Endereço de entrega: <p>endereco</p>
          </spam>
          <p>Tempo de entrega: tempoEntrega</p>
        </div>
        {carrinho.length === 0 ? (
          <img
            className="carrinho-vazio"
            src={carrinhoVazio}
            alt="Sem produtos no carrinho"
          />
        ) : (
          <div>
            <ItemCarrinho />
            <Link to="">Adicionar mais itens ao pedido</Link>
            <div>
              <div>
                <p>Subtotal</p>
                <p>R$ 299,97</p>
              </div>
              <div>
                <p>Taxa de entrega</p>
                <p>R$ 8,90</p>
              </div>
              <div>
                <p>Total</p>
                <p>R$ 308,87</p>
              </div>
            </div>
            <button className="btn__laranja">Confirmar Pedido</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrinho;
