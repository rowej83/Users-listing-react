import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import { User } from "./utils/UserClass";
import UsersList from "./components/User/UsersList";
import UserEdit from "./components/User/UserEdit";
import UserAdd from "./components/User/UserAdd";
import UsersContext from "./utils/UsersContext";
import "./styles.css";
import "../node_modules/bulma/css/bulma.css";
import { getArrayOfUsers, saveUserToLocalStorage } from "./utils/StorageHelper";
import { createBrowserHistory } from "history";

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
          <button
            onClick={() => {
              // let initialValues = [];
              localStorage.clear();
              for (let i = 0; i < 10; i++) {
                saveUserToLocalStorage(
                  new User(`jason-${i}`, i, `rowej83-${i}@gmail.com`)
                );
              }
            }}
          >
            Reset Users
          </button>
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
