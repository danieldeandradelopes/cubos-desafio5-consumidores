import { ReactComponent as TimeIcon } from "../../assets/time.svg";
const TagTempoEntrega = ({ tempoEntrega }) => {
  return (
    <div className="flex-row content-center ">
      <TimeIcon />
      <span className="text-bold mg-left-9 color-text-tag">
        Tempo de Entrega:
      </span>
      <p></p>
    </div>
  );
};

export default TagTempoEntrega;
