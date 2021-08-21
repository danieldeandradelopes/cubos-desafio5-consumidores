import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TagPedidoMinimo from "../TagPedidoMinimo";
import TagTempoEntrega from "../TagTempoEntrega";

import CardProduto from "../../componentes/CardProduto";
import SemPratos from "../SemPratos";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { UseFetch } from "../../contexto/regraDeNegocio";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Cardapio = () => {
  const [restaurante, setRestaurante] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const { handleExibirCardapio } = UseFetch();
  const { id_restaurante } = useParams();
  const classes = useStyles();
  console.log(produtos);

  const loading = async () => {
    setCarregando(true);
    const dados = await handleExibirCardapio(id_restaurante);
    if (dados.erro) {
      setCarregando(false);
      toast.error(dados.erro, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setRestaurante(dados);
    setProdutos(dados.produtos);
    setCarregando(false);
  };

  useEffect(() => {
    loading();
  }, []);

  return (
    <div className="cardapio">
      <div className="cardapio__btn__revisar">
        <button>Revisar Pedido</button>
      </div>
      <div className="cardapio__info">
        <TagPedidoMinimo valorPedidoMinimo={restaurante.valor_minimo_pedido} />
        <TagTempoEntrega tempoEntrega={restaurante.tempo_entrega_minutos} />
      </div>
      <div className="cardapio__lista__produtos">
        {produtos.length ? (
          produtos.map((p) => (
            <CardProduto
              key={p.id}
              nome={p.nome}
              descricao={p.descricao}
              preco={p.preco}
              imagem={p.imagem}
            />
          ))
        ) : (
          <SemPratos />
        )}
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Cardapio;
