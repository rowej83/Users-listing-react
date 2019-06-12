import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router-dom";
import UsersList from "./components/User/UsersList";
import UserEdit from "./components/User/UserEdit";
import UserAdd from "./components/User/UserAdd";
import UsersContext from "./utils/UsersContext";
import "./styles.css";
import "../node_modules/bulma/css/bulma.css";
import { getArrayOfUsers } from "./utils/StorageHelper";
import { createBrowserHistory } from "history";
import Example from "./Example";

const customHistory = createBrowserHistory();
const initialUser = [
  {
    name: "jason",
    age: 11,
    email: "dsds@sdsd.com"
  },
  {
    name: "jason2",
    age: 11,
    email: "dsds@sdsd.com"
  },
  {
    name: "jason3",
    age: 11,
    email: "dsds@sdsd.com"
  }
];

function App() {
  const [currentUserID, setCurrentUserID] = React.useState({});
  const [Users, setUsers] = React.useState([]);
  React.useEffect(() => {
    //console.log(getArrayOfUsers());
    setUsers(getArrayOfUsers());
  }, [Users]);

  return (
    <UsersContext.Provider
      value={{ currentUserID, setCurrentUserID, Users, setUsers }}
    >
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
