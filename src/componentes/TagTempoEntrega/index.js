import { ReactComponent as TimeIcon } from "../../assets/time.svg";
import { UseFetch } from "../../contexto/regraDeNegocio";

const TagTempoEntrega = () => {
  const { restauranteLocal } = UseFetch();
  return (
    <div className="flex-row content-center ">
      <TimeIcon />
      <p style={{ color: "#525459" }}>
        <span className="text-bold mg-left-9 color-text-tag">
          Tempo de Entrega:
        </span>
        {` ${restauranteLocal && restauranteLocal.tempo_entrega_minutos}`}
      </p>
    </div>
  );
};

export default TagTempoEntrega;
