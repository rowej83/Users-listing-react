import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import UsersList from "./components/User/UsersList";
import UserEdit from "./components/User/UserEdit";
import UserAdd from "./components/User/UserAdd";
import UsersContext from "./utils/UsersContext";
import { getArrayOfUsers } from "./utils/StorageHelper";
import { createBrowserHistory } from "history";
import "../node_modules/bulma/css/bulma.css";
import "./styles.css";

const customHistory = createBrowserHistory();

function App() {
  const [Users, setUsers] = React.useState([]);
  React.useEffect(() => {
    setUsers(getArrayOfUsers());
  }, [Users]);

  return (
    <UsersContext.Provider value={{ Users, setUsers }}>
      <Router history={customHistory}>
        <div>
          <h1
            className="mainheader"
            onClick={e => {
              customHistory.push("/");
            }}
          >
            User Management
          </h1>

          <div class="section">
            <div class="container">
              <Link
                to="/users/add"
                className="button is-primary full-size"
                active-class="is-active "
              >
                Add User
              </Link>

              <hr />
              <div>
                <Route path="/users/edit/:id" component={UserEdit} />
                <Route path="/users/add" component={UserAdd} />
                <Route path={["/", "/users"]} exact component={UsersList} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    </UsersContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
