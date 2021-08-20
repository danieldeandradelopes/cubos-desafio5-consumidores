import "./style.css";

import Sucesso from "../../assets/endereco-sucesso.png";


const modalEndereco = () => {


  return (
    <div className="modal-endereco">
      <div className="endereco-container">
        <span className="botao-fechar-modal">X</span>

        <h2>Adicionar Endereço</h2>

        <form className="endereco-form">

          <label>
            CEP
            <input
              type="text"
              className="inputs-endereco"
            />
          </label>

          <label>
            Endereco
            <input
              type="text"
              className="inputs-endereco"
            />
          </label>

          <label>
            Complemento
            <input
              type="text"
              className="inputs-endereco"
            />
          </label>

          <button className="btn__laranja"> Adicionar Endereço </button>
        </form>

        <img src={Sucesso} alt="" />

        <button className="btn__laranja"> Voltar para o carrinho </button>
      </div>
    </div>
  );

};

export default modalEndereco;
