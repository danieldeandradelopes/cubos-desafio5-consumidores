import "./style.css";
import { UseFetch } from "../../../contexto/regraDeNegocio";

function ItemCarrinho({
  imagemProduto,
  nomeProduto,
  quantidade,
  precoProduto,
  idProduto,
  descricao,
}) {
  const { setAbrirCard, setAbrirCarrinho, setItemClick } = UseFetch();

  function retornarCard() {
    setAbrirCarrinho(false);
    setAbrirCard(true);
    setItemClick({
      id: idProduto,
      nome: nomeProduto,
      descricao: descricao,
      preco: precoProduto,
      imagem: imagemProduto,
    });
  }

  return (
    <div className="flex-row w-full margem-y" onClick={() => retornarCard()}>
      <div
        className="imagem-item"
        style={{
          backgroundImage: `url(${imagemProduto})`,
          backgroundPositio: "center center",
          backgroundSize: "cover",
        }}
      />
      <div className="flex-column">
        <h2 className="nome-produto">{nomeProduto}</h2>
        <p className="quantidade-produto">{quantidade} unidades</p>
        <p className="preco-produto">{(precoProduto / 100).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ItemCarrinho;
