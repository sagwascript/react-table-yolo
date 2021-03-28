import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SimpleTable from "./SimpleTable";
import BlockTable from "./BlockTable";
import BlockFluidTable from "./BlockFluidTable";
import ScrollableBlockFluidTable from "./ScrollableBlockFluidTable";
import VirtualizedBlockFluidTable from "./VirtualizedBlockFluidTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Simple</Link>
            </li>
            <li>
              <Link to="/block-table">Block</Link>
            </li>
            <li>
              <Link to="/block-fluid-table">Block Fluid</Link>
            </li>
            <li>
              <Link to="/scrollable-block-fluid-table">
                Scrollable Block Fluid
              </Link>
            </li>
            <li>
              <Link to="/virtualized-block-fluid-table">
                Virtualized Block Fluid
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={SimpleTable} />
          <Route exact path="/block-table" component={BlockTable} />
          <Route exact path="/block-fluid-table" component={BlockFluidTable} />
          <Route
            exact
            path="/scrollable-block-fluid-table"
            component={ScrollableBlockFluidTable}
          />
          <Route
            exact
            path="/virtualized-block-fluid-table"
            component={VirtualizedBlockFluidTable}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
