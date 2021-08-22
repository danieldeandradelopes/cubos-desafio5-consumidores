import { ReactComponent as TimeIcon } from "../../assets/time.svg";
import { useLocalStorage } from "react-use";

const TagTempoEntrega = () => {
  const [restauranteLocal] = useLocalStorage("dadosRestaurante");
  return (
    <div className="flex-row content-center ">
      <TimeIcon />
      <p style={{ color: "#525459" }}>
        <span className="text-bold mg-left-9 color-text-tag">
          Tempo de Entrega:
        </span>
        {` ${restauranteLocal.tempo_entrega_minutos}`}
      </p>
    </div>
  );
};

export default TagTempoEntrega;
