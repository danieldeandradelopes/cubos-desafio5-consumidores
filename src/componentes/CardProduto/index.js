import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import produtoCarrinho from "../../assets/produto-adicionado.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { UseFetch } from "../../contexto/regraDeNegocio";
import TagPedidoMinimo from "../TagPedidoMinimo";
import TagTempoEntrega from "../TagTempoEntrega";

function CardProduto({ id, nome, descricao, preco, imagem }) {
  const [quantidade, setQuantidade] = useState(0);
  const [produtoAdd, setProdutoAdd] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { setAbrirCard, abrirCard } = UseFetch();

  function contador(soma) {
    const calcul = quantidade + soma;
    if (calcul < 0) return;
    setQuantidade(calcul);
  }

  function fecharModalProduto() {
    setProdutoAdd(false);
    setAbrirCard(false);
  }

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  return (
    <div className="overlay">
      <div className="modal_produto">
        <div className="flex-column relative">
          <img
            className="imagem-produto item-center"
            src="https://s2.glbimg.com/NauS0apjaDKrB0EJY1H-LtOhcQM=/696x390/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/D/Q/NYYDWXQFG9FCq7CBnzaA/pizza.jpeg"
            alt="imagem-produto"
          />
          <img
            className="imagem-restaurante"
            src={imagem}
            alt="imagem-restaurante"
          />
          <button className="fechar-modal" onClick={() => fecharModalProduto()}>
            &times;
          </button>
          <div className="padding-card-produto">
            {produtoAdd ? (
              <div className="flex-column content-center item-center produto-add">
                <img
                  className="imagem-produto-add item-center"
                  src={produtoCarrinho}
                  alt="imagem-produto"
                />
              </div>
            ) : (
              <div>
                <h1 className="titulo-produto">{nome}</h1>
                <div className="componente-pedido-entrega">
                  <TagPedidoMinimo />
                  <TagTempoEntrega />
                </div>
                <div className="flex-row space-between">
                  <div>
                    <p>{descricao}</p>
                  </div>
                  <div className="preco-produto">
                    R$ {(preco / 100).toFixed(2)}
                  </div>
                </div>
                <div className="flex-row space-between paddingY">
                  <div className="contador flex-row">
                    <button
                      className="botao-contador"
                      onClick={() => contador(+1)}
                    >
                      +
                    </button>
                    <div className="flex-column content-center margemY">
                      {quantidade}
                    </div>
                    <button
                      className="botao-contador"
                      onClick={() => contador(-1)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="btn__laranja"
                    onClick={() => setProdutoAdd(true)}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            )}
            <div className="flex-row content-center">
              <Link to="">Ir para revisão do pedido</Link>
            </div>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default CardProduto;
