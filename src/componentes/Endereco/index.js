import "./style.css";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { UseClientAuth } from "../../contexto/autorizacao";
import Sucesso from "../../assets/endereco-sucesso.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  cep: yup.string().required("Campo não pode ser nulo"),
  endereco: yup.string().required("Campo não pode ser nulo"),
  complemento: yup.string().required("Campo não pode ser nulo"),
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ModalEndereco = () => {
  const [carregando, setCarregando] = useState();
  const { handleEndereco } = UseFetch();
  const { gravarConsumidor } = UseClientAuth();
  const classes = useStyles();
  const {
    abrirEndereco,
    setAbrirEndereco,
    setEndereco,
    endereco,
    setAbrirCarrinho,
  } = UseFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function carrinho() {
    setAbrirEndereco(false);
    setAbrirCarrinho(true);
  }

  const handleEnviarEndereco = async (data) => {
    setCarregando(true);
    const resposta = await handleEndereco(data);

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
    const enderecoSetado = `${gravarConsumidor.endereco.endereco} + ${gravarConsumidor.endereco.complemento} + ${gravarConsumidor.endereco.cep}`;
    setEndereco(enderecoSetado);
    setCarregando(false);
  };

  return (
    <div className={abrirEndereco ? "overlay" : "fechado"}>
      <div className="modal-endereco">
        <div className="endereco-container">
          <span
            className="botao-fechar-modal"
            onClick={() => setAbrirEndereco(false)}
          >
            X
          </span>
          <h2 className="titulo-endereco">Adicionar Endereço</h2>
          {endereco ? (
            <div className="div-sucesso flex-column item-center">
              <img src={Sucesso} alt="" />
              <button className="btn__laranja" onClick={() => carrinho()}>
                Voltar para o carrinho
              </button>
            </div>
          ) : (
            <form
              className="endereco-form"
              onSubmit={handleSubmit(handleEnviarEndereco)}
            >
              <div>
                <label>
                  CEP
                  <input
                    type="text"
                    className="inputs-endereco"
                    style={{ borderColor: errors.cep && "red" }}
                    {...register("cep", { required: true })}
                  />
                  <p className="erro__input">{errors.cep?.message}</p>
                </label>
                <label>
                  Endereco
                  <input
                    type="text"
                    className="inputs-endereco"
                    style={{ borderColor: errors.endereco && "red" }}
                    {...register("endereco", { required: true })}
                  />
                  <p className="erro__input">{errors.endereco?.message}</p>
                </label>
                <label>
                  Complemento
                  <input
                    type="text"
                    className="inputs-endereco"
                    style={{ borderColor: errors.complemento && "red" }}
                    {...register("complemento", { required: true })}
                  />
                  <p className="erro__input">{errors.complemento?.message}</p>
                </label>
              </div>
              <button type="submit" className="btn__laranja">
                Adicionar Endereço{" "}
              </button>
            </form>
          )}
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ModalEndereco;
