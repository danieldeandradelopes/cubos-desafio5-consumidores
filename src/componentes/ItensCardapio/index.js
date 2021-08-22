import { useState } from "react";
import "./style.css";
import { UseFetch } from "../../contexto/regraDeNegocio";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import CardProdutos from "../CardProduto";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ItemCardapio = ({ id, nome, descricao, preco, imagem }) => {
  const [carregando, setCarregando] = useState(false);

  const { setAbrirCard, abrirCard } = UseFetch();

  const classes = useStyles();

  return (
    <div
      className="item__cardapio"
      onClick={() => {
        setCarregando(true);
        setAbrirCard((prev) => !prev);
        setCarregando(false);
      }}
    >
      <CardProdutos
        id={id}
        nome={nome}
        descricao={descricao}
        preco={preco}
        imagem={imagem}
      />
      <div className="card__front">
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p className="card__preco">R$ {(preco / 100).toFixed(2)}</p>
        </div>
        <div className="card__imagem">
          <img src={imagem} alt="Foto produto" />
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ItemCardapio;
