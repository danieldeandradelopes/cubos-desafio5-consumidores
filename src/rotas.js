import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { FetchProvider } from "./contexto/regraDeNegocio";
import ConsumidorLogin from "./paginas/loginConsumidor";
import ConsumidorCadastro from "./paginas/cadastroConsumidor";
import { ClientAuthProvider } from "./contexto/autorizacao";
import { UseClientAuth } from "./contexto/autorizacao";
import ListaRestaurantes from "./paginas/listaRestaurantes";

function ClientAuthPath(props) {
  const { gravarConsumidor } = UseClientAuth();

  return (
    <Route
      render={() =>
        gravarConsumidor ? props.children : <Redirect to="/consumidor-login" />
      }
    />
  );
}

function Rotas() {
  return (
    <Router>
      <ClientAuthProvider>
        <FetchProvider>
          <Switch>
            <Route exact path="/consumidor-login" component={ConsumidorLogin} />
            <Route path="/consumidor-cadastro" component={ConsumidorCadastro} />
            <ClientAuthPath>
              <Route
                exact
                path="/lista-restaurantes"
                component={ListaRestaurantes}
              />
            </ClientAuthPath>
          </Switch>
        </FetchProvider>
      </ClientAuthProvider>
    </Router>
  );
}

export default Rotas;
