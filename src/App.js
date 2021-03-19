import { Switch, Route } from "react-router-dom"
import Home from "./views/Home"
import Register from "./components/Register"
import NotFound from "./views/NotFound"
import ProfilePage from "./views/Profile"
import Messages from "./views/Messages"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/Profile" component={ProfilePage}/>
        <Route path="/messages" component={Messages} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
