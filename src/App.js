import { Switch, Route } from "react-router-dom"
import Home from "./views/Home"
import Register from "./components/Register"
import NotFound from "./views/NotFound"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
