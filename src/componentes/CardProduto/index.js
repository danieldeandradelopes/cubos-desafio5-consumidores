import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { toast } from "react-toastify";
import "./style.css";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Card = ({ id, nome, descricao, preco, imagem }) => {
  const [carregando, setCarregando] = useState(false);

  const classes = useStyles();

  return (
    <div className="card">
      <div className="card__front">
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p className="card__preco">R$ {(preco / 100).toFixed(2)}</p>
        </div>
        <div className="card__imagem">
          <img src={imagem} />
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Card;
