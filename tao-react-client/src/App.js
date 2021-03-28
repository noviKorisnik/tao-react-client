import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Tao from "./components/Tao";
import Book from "./components/Book";
import Chapter from "./components/Chapter";
import { useEffect } from "react";
import Navigator from "./components/Navigator";

const App = () => {
  const navDispatcher = (e) => {
    if (e.altKey) return;
    const direction =
      e.code === 'ArrowLeft' ? 'prev'
        : e.code === 'ArrowRight' ? 'next'
          : null;
    if (direction !== null) {
      document.dispatchEvent(
        new CustomEvent('navigate', { detail: { direction: direction } })
      );
    };
  }

  useEffect(() => {
    document.addEventListener('keydown', navDispatcher);
    return () => { document.removeEventListener('keydown', navDispatcher); };
  });

  return (
    <Router>
      <Navigator />
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