import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <>
      <Router basename="https://sangmin-yoon.github.io/2021-Mflix">
        <Header />
        <Switch>
          <Route path={["/tv", "/tv/:tvId"]}>
            <Tv />
          </Route>
          <Route path={["/search", "serch/:searchId"]}>
            <Search />
          </Route>
          <Route path={["/movies", "/:movieId"]}>
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
