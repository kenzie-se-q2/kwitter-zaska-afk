import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
