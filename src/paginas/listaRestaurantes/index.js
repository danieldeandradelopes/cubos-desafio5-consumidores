import "./style.css";
import HeaderConsumidor from "../../componentes/HeaderConsumidor";
import Restaurantes from "../../componentes/Restaurantes";

const ListaRestaurantes = () => {
  return (
    <>
      <HeaderConsumidor />
      <div className="container__restaurantes">
        <Restaurantes />
      </div>
    </>
  );
};

export default ListaRestaurantes;
