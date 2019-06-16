import React from "react";
import { withRouter } from "react-router-dom";
import UsersContext from "../../utils/UsersContext";
import { confirm } from "alertifyjs";
import "/../node_modules/alertifyjs/build/css/alertify.css";
import { notify } from "alertifyjs";
import {
  deleteUserFromArray,
  getArrayOfUsers,
  returnUserByIndex
} from "../../utils/StorageHelper";

const UsersList = props => {
  const { Users, setUsers } = React.useContext(UsersContext);

  const editUser = index => {
    props.history.push("/users/edit/" + index);
  };

  const deleteUser = index => {
    let user = returnUserByIndex(index);
    confirm(
      "Delete User",
      `Do you want to delete user <b>${user.name}</b>?`,
      async () => {
        console.log("started");
        let element = document.getElementById("user-" + index);
        console.log(element);
        element.classList.add(`fade-out`);
        await new Promise(resolve => {
          setTimeout(resolve, 200);
        });
        element.classList.remove(`fade-out`);
        console.log("waited");
        deleteUserFromArray(index);
        notify(`${user.name} has been deleted.`, "success", 3);
        setUsers(getArrayOfUsers());
        // props.history.push("/");
      },
      () => {}
    );
    // props.history.push("/users/delete/" + index);
  };

  return (
    <div>
      <h2 className="line-container">
        <span
          style={{
            marginBottom: "20px",
            display: Users.length > 0 ? "block" : "none"
          }}
        >
          All Users
        </span>
        <span style={{ display: Users.length === 0 ? "block" : "none" }}>
          There are no Users. Please add some.
        </span>
      </h2>

      <div className="columns is-multiline">
        {Users.map((User, index) => {
          //let newID = uuid();

          return (
            <div
              className="column is-half outerdiv"
              key={"user-" + index}
              id={"user-" + index}
            >
              <div className="card">
                <div className="card-content">
                  <p className="title" style={{ marginBottom: "40px" }}>
                    {User.name}
                  </p>
                  <p className="subtitle">Age: {User.age}</p>
                  <p className="subtitle">Email: {User.email}</p>
                </div>

                <footer className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      <button
                        onClick={e => {
                          editUser(index);
                        }}
                      >
                        Edit
                      </button>
                    </span>
                  </p>

                  <p className="card-footer-item">
                    <span>
                      <button
                        onClick={e => {
                          deleteUser(index);
                        }}
                      >
                        Delete
                      </button>
                    </span>
                  </p>
                </footer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(UsersList);
