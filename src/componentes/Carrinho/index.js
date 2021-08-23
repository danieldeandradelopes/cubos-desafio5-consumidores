import "./style.css";
import { ReactComponent as CarrinhoSVG } from "../../assets/carrinho.svg";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { UseClientAuth } from "../../contexto/autorizacao";
import carrinhoVazio from "../../assets/carrinho-vazio.png";
import pedidoEnviado from "../../assets/carrinho-enviado.png";
import ItemCarrinho from "./ItemCarrinho";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function CarrinhoModal() {
  const {
    carrinho,
    setCarrinho,
    endereco,
    setEndereco,
    abrirCarrinho,
    setAbrirCarrinho,
    setAbrirEndereco,
    handlePedido,
    restauranteLocal,
  } = UseFetch();
  const { gravarConsumidor } = UseClientAuth();
  const [carrinhoEnviado, setCarrinhoEnviado] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState();
  const classes = useStyles();

  function addEndereco() {
    setAbrirCarrinho(false);
    setAbrirEndereco(true);
  }

  useEffect(() => {
    if (gravarConsumidor.endereco?.endereco) {
      const enderecoSetado = `${gravarConsumidor.endereco.endereco}, ${gravarConsumidor.endereco.complemento}, ${gravarConsumidor.endereco.cep}`;
      setEndereco(enderecoSetado);
      return;
    }
  }, []);

  useEffect(() => {
    if (carrinho.length !== 0) {
      const valores = carrinho.length !== 0 && [...carrinho];
      const precos = [];
      for (const item of valores) {
        precos.push(item.preco * item.quantidade);
      }

      const sub = precos.reduce((acc, x) => acc + x);
      console.log(sub);
      const subT = (sub / 100).toFixed(2);
      setSubTotal(subT);

      const taxa =
        restauranteLocal && (restauranteLocal.taxa_entrega / 100).toFixed(2);
      const mostrarTotal = Number(subT) + Number(taxa);
      setTotal(mostrarTotal);
    }
  }, [carrinho]);

  const handleEnviarPedido = async (data) => {
    setCarregando(true);
    const resposta = await handlePedido(data);

    if (resposta.erro) {
      setCarregando(false);
      toast.error(resposta.erro, {
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
    console.log(resposta);
    setCarregando(false);
    setCarrinhoEnviado(true);
  };

  function enviarPedido() {
    if (!endereco) {
      alert("Endereço não fornecido");
      return;
    }
    const pedidos = [...carrinho];
    pedidos.map((p) => {
      delete p.nome;
      delete p.imagem;
      delete p.preco;
    });

    handleEnviarPedido(pedidos);
  }

  function fecharModalCarrinho() {
    if (carrinhoEnviado) {
      setCarrinhoEnviado(false);
      setCarrinho([]);
    }
    setAbrirCarrinho(false);
  }

  return (
    <div className={abrirCarrinho ? "overlay" : "fechado"}>
      <div className="modal_carrinho">
        <div className="flex-row">
          <CarrinhoSVG />
          <h1 className="restaurante-carrinho">
            {restauranteLocal && restauranteLocal.nome}
          </h1>
          <button
            className="fechar-modal cor-fechar-modal"
            onClick={() => fecharModalCarrinho()}
          >
            &times;
          </button>
        </div>
        {endereco ? (
          <span className="endereco-carrinho">
            Endereço de entrega:
            <p className="endereco-api">{endereco}</p>
          </span>
        ) : (
          <div className="adicionar-endereco">
            <Link className="link-endereco" onClick={() => addEndereco()}>
              Adicionar Endereço
            </Link>
          </div>
        )}
        {carrinho.length === 0 ? (
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
              onClick={() => setAbrirCarrinho(false)}
            >
              Voltar para o cardápio
            </button>
          </div>
        ) : (
          <div className="flex-column item-center content-center">
            <p className="margem-tempo-entrega">
              Tempo de entrega:{" "}
              {restauranteLocal && restauranteLocal.valor_minimo_pedido} minutos
            </p>
            {carrinho.length > 0 &&
              carrinho.map((item) => (
                <ItemCarrinho
                  imagemProduto={item.imagem}
                  nomeProduto={item.nome}
                  quantidade={item.quantidade}
                  precoProduto={item.preco}
                  idProduto={item.id}
                />
              ))}
            <Link
              className="pagina-restaurantes"
              onClick={() => setAbrirCarrinho(false)}
            >
              Adicionar mais itens ao pedido
            </Link>
            <div className="total-carrinho flex-column">
              <div className="valores-carrinho">
                <p className="titulos-valores">Subtotal</p>
                <p>R$ {subTotal}</p>
              </div>
              <div className="valores-carrinho">
                <p className="titulos-valores">Taxa de entrega</p>
                <p>
                  R${" "}
                  {restauranteLocal &&
                    (restauranteLocal.taxa_entrega / 100).toFixed(2)}
                </p>
              </div>
              <div className="valores-carrinho">
                <p className="titulos-valores">Total</p>
                <p className="total-valor">R$ {total}</p>
              </div>
            </div>
            <button className="btn__laranja" onClick={() => enviarPedido()}>
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default CarrinhoModal;
