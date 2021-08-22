import HeaderConsumidor from "../../componentes/HeaderConsumidor";
import Cardapio from "../../componentes/Cardapio";
import CardProduto from "../../componentes/CardProduto";
import CarrinhoModal from "../../componentes/Carrinho";
import ModalEndereco from "../../componentes/Endereco";

const CardapioRestaurante = () => {
  return (
    <>
      <HeaderConsumidor />
      <Cardapio />
      <CardProduto />
      <CarrinhoModal />
      <ModalEndereco />
    </>
  );
};

export default CardapioRestaurante;
