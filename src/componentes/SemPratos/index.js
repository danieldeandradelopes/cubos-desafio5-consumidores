import "./style.css";

import { ReactComponent as ServirIcon } from "../../assets/servir-icon.svg";

const SemPratos = () => {
  return (
    <div className="container__sem__pratos">
      <div className="sem-pratos">
        <ServirIcon />
        <p>Desculpe, estamos sem produtos ativos</p>
      </div>
    </div>
  );
};

export default SemPratos;
