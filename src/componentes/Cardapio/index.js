import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TagPedidoMinimo from "../TagPedidoMinimo";
import TagTempoEntrega from "../TagTempoEntrega";

import ItemCardapio from "../ItensCardapio";
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
  const [verMais, setVerMais] = useState(false);
  const { handleExibirCardapio, setAbrirCarrinho } = UseFetch();
  const { id_restaurante } = useParams();
  const classes = useStyles();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cardapio">
      <div className="cardapio__btn__revisar">
        <button onClick={() => setAbrirCarrinho(true)}>Revisar Pedido</button>
      </div>
      <div className="cardapio__info">
        <TagPedidoMinimo valorPedidoMinimo={restaurante.valor_minimo_pedido} />
        <TagTempoEntrega tempoEntrega={restaurante.tempo_entrega_minutos} />
        <div className="descricao-container">{
          restaurante.descricao && (
            <>
              {!verMais && restaurante.descricao.length > 40
                ? restaurante.descricao.slice(0, 40) + "..."
                : restaurante.descricao}{" "}
              <button
                onClick={() => setVerMais(!verMais)}
                className={
                  restaurante.descricao.length < 40
                    ? "ver-menos"
                    : "ver-mais"
                }
              >
                {verMais ? "ver menos" : "ver mais"}
              </button>
            </>
          )}</div>
      </div>
      <div className="cardapio__lista__produtos">
        {produtos.length !== 0 ? (
          produtos.map((p) => (
            <ItemCardapio
              id={p.id}
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
