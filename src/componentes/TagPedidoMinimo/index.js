import { ReactComponent as SifraoIcon } from "../../assets/sifrao.svg";

const TagPedidoMinimo = ({ valorPedidoMinimo }) => {
  return (
    <div className="flex-row content-center">
      <SifraoIcon />
      <p>
        <span className="text-bold mg-left-9 color-text-tag ">
          Pedido Mínimo:
        </span>
        {` R$ ${(valorPedidoMinimo / 100).toFixed(2)}`}
      </p>
    </div>
  );
};

export default TagPedidoMinimo;
