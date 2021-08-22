import { ReactComponent as SifraoIcon } from "../../assets/sifrao.svg";
import { useLocalStorage } from "react-use";

const TagPedidoMinimo = () => {
  const [restauranteLocal] = useLocalStorage("dadosRestaurante");

  return (
    <div className="flex-row content-center">
      <SifraoIcon />
      <p style={{ color: "#525459" }}>
        <span className="text-bold mg-left-9 color-text-tag ">
          Pedido Mínimo:
        </span>
        {` R$ ${(restauranteLocal.valor_minimo_pedido / 100).toFixed(2)}`}
      </p>
    </div>
  );
};

export default TagPedidoMinimo;
