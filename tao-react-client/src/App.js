import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Tao from "./components/Tao";
import Book from "./components/Book";
import Chapter from "./components/Chapter";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Tao />
        </Route>
        <Route path="/book/:code">
          <Book />
        </Route>
        <Route path="/chapter/:code">
          <Chapter />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;