import "./style.css";
import HeaderConsumidor from "../../componentes/HeaderConsumidor";
import Restaurantes from "../../componentes/Restaurantes";
import { useEffect } from "react";
import { UseFetch } from "../../contexto/regraDeNegocio";

const ListaRestaurantes = () => {
  const { setGravarCarrinho } = UseFetch();
  useEffect(() => {
    setGravarCarrinho({});
  }, []);
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
