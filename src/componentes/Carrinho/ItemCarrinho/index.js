import "./style.css";

function ItemCarrinho() {
  return (
    <div className="flex-row w-full margem-y">
      <div
        className="imagem-item"
        style={{
          backgroundImage:
            "url(https://st2.depositphotos.com/1692343/5636/i/600/depositphotos_56360353-stock-photo-hot-homemade-pepperoni-pizza.jpg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
      <div className="flex-column">
        <h2 className="nome-produto">Nome do Produto</h2>
        <p className="quantidade-produto">X unidades</p>
        <p className="preco-produto">preço</p>
      </div>
    </div>
  );
}

export default ItemCarrinho;
