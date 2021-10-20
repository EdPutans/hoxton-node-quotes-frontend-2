import "./App.css";
import QuotePage from "./pages/QuotePage";

import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

const paths = [
  { path: "/random-quote", component: () => QuotePage({ type: 'random' }), linkText: "Random Quote" },
  { path: "/quotes", component: () => QuotePage({ type: 'all' }), linkText: "All Quotes" }
];

function App() {
  return (
    <BrowserRouter>
      <nav>
        {paths.map(({ path, linkText }) => (
          <Link key={path} style={{ marginRight: 10, textDecoration: 'none' }} to={path}>
            {linkText}
          </Link>
        ))}
      </nav>


      <div className="app">
        <div className="container">
          <Switch>
            {paths.map((path) => (
              <Route key={path.path} {...path} exact />
            ))}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
