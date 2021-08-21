import "./style.css";
import { ReactComponent as CarrinhoSVG } from "../../assets/carrinho.svg";
import { UseFetch } from "../../contexto/regraDeNegocio";
import carrinhoVazio from "../../assets/carrinho-vazio.png";
import pedidoEnviado from "../../assets/carrinho-enviado.png";
import ItemCarrinho from "./ItemCarrinho";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function CarrinhoModal() {
  const { carrinho, endereco } = UseFetch();
  const [carrinhoEnviado, setCarrinhoEnviado] = useState(false);
  const history = useHistory();

  return (
    <div className="overlay">
      <div className="modal_carrinho">
        <div className="flex-row">
          <CarrinhoSVG />
          <h1 className="restaurante-carrinho">Nome Restaurante</h1>
        </div>
        {endereco ? (
          <spam className="endereco-carrinho">
            Endereço de entrega: <p className="endereco-api">endereco</p>
          </spam>
        ) : (
          <div className="adicionar-endereco">
            <Link className="modal-endereco" to="">
              Adicionar Endereço
            </Link>
          </div>
        )}
        {carrinho.length === 1 ? (
          <div className="flex-row content-center item-center w-h-100">
            <img
              className="carrinho-vazio"
              src={carrinhoVazio}
              alt="Sem produtos no carrinho"
            />
          </div>
        ) : carrinhoEnviado ? (
          <div className="flex-column content-center item-center w-h-100">
            <img
              className="carrinho-vazio margem-top"
              src={pedidoEnviado}
              alt="Sem produtos no carrinho"
            />
            <button
              className="btn__laranja margem-auto"
              onClick={() => history.push("")}
            >
              Voltar para o cardápio
            </button>
          </div>
        ) : (
          <div className="flex-column item-center content-center">
            <p className="margem-tempo-entrega">
              Tempo de entrega: tempoEntrega
            </p>
            {carrinho.map((item) => (
              <ItemCarrinho />
            ))}
            <Link className="pagina-restaurantes" to="">
              Adicionar mais itens ao pedido
            </Link>
            <div className="total-carrinho flex-column">
              <div className="valores-carrinho">
                <p className="titulos-valores">Subtotal</p>
                <p>R$ 299,97</p>
              </div>
              <div className="valores-carrinho">
                <p className="titulos-valores">Taxa de entrega</p>
                <p>R$ 8,90</p>
              </div>
              <div className="valores-carrinho">
                <p className="titulos-valores">Total</p>
                <p className="total-valor">R$ 308,87</p>
              </div>
            </div>
            <button
              className="btn__laranja"
              onClick={() => setCarrinhoEnviado(true)}
            >
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarrinhoModal;
