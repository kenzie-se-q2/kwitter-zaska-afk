import { Switch, Route } from "react-router-dom"
import Home from "./views/Home"
import Register from "./views/Register"
import NotFound from "./views/NotFound"
import ProfilePage from "./views/Profile"
import Messages from "./views/Messages"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/profile/:username" component={ProfilePage} />
        <Route path="/messages" component={Messages} />
        <Route path="/topten" component={Messages} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
