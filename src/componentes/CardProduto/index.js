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

function CardProduto() {
  const [produtoAdd, setProdutoAdd] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const {
    setAbrirCard,
    abrirCard,
    quantidade,
    setQuantidade,
    setAbrirCarrinho,
    gravarCarrinho,
    setGravarCarrinho,
    itemClick,
    restauranteLocal,
  } = UseFetch();

  function contador(soma) {
    const calcul = quantidade + soma;
    if (calcul < 0) return;
    setQuantidade(calcul);
  }

  function fecharModalProduto() {
    setAbrirCard(false);
    setProdutoAdd(false);
    setQuantidade(0);
  }

  function carrinhoModal() {
    setAbrirCard(false);
    setProdutoAdd(false);
    setQuantidade(0);
    setAbrirCarrinho(true);
  }

  function produtoAdicionado() {
    if (quantidade === 0) {
      return;
    }

    const { id, nome, preco, imagem } = itemClick;

    const produtoDasLojas = gravarCarrinho ?? {};

    if (produtoDasLojas.hasOwnProperty(restauranteLocal.id)) {
      const produtoIndex = produtoDasLojas[restauranteLocal.id].findIndex(
        (item) => item.id === id
      );
      if (produtoIndex !== -1) {
        produtoDasLojas[restauranteLocal.id][produtoIndex].quantidade =
          quantidade;
      } else {
        produtoDasLojas[restauranteLocal.id].push({
          quantidade,
          id,
          nome,
          preco,
          imagem,
        });
      }
    } else {
      console.log("oi");
      produtoDasLojas[restauranteLocal.id] = [
        { quantidade, id, nome, preco, imagem },
      ];
    }
    setGravarCarrinho(produtoDasLojas);
    setProdutoAdd(true);
  }

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  return (
    <div className={abrirCard ? "overlay" : "fechado"}>
      <div className="modal_produto">
        <div className="flex-column relative">
          <img
            className="imagem-produto item-center"
            src={itemClick.imagem}
            alt="imagem-produto"
          />
          <img
            className="imagem-restaurante"
            src={restauranteLocal && restauranteLocal.imagem}
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
              <div className="flex-column">
                <h1 className="titulo-produto">{itemClick.nome}</h1>
                <div className="componente-pedido-entrega">
                  <TagPedidoMinimo valorPedidoMinimo />
                  <TagTempoEntrega tempoEntrega />
                </div>
                <div className="flex-row space-between">
                  <div>
                    <p>{itemClick.descricao}</p>
                  </div>
                  <div className="preco-produto">
                    R$ {(itemClick.preco / 100).toFixed(2)}
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
                    onClick={() => produtoAdicionado()}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            )}
            <div className="flex-row content-center">
              <Link onClick={() => carrinhoModal()}>
                Ir para revisão do pedido
              </Link>
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
