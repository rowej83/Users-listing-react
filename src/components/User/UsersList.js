import React from "react";
import { withRouter } from "react-router-dom";
import UsersContext from "../../utils/UsersContext";
import { confirm, notify } from "alertifyjs";
import "/../node_modules/alertifyjs/build/css/alertify.css";

import {
  deleteUserFromArray,
  getArrayOfUsers,
  returnUserByIndex
} from "../../utils/StorageHelper";

const UsersList = props => {
  const { Users, setUsers } = React.useContext(UsersContext);
  const refsArray = React.useRef([]);
  const editUser = index => {
    props.history.push("/users/edit/" + index);
  };

  const deleteUser = index => {
    let user = returnUserByIndex(index);
    confirm(
      "Delete User",
      `Do you want to delete user <b>${user.name}</b>?`,
      async () => {
        refsArray.current[index].classList.add("fade-out");
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        });
        refsArray.current[index].style.display = "none";
        refsArray.current[index].classList.remove("fade-out");
        //below is needed to do normal functionality
        deleteUserFromArray(index);
        console.log(refsArray.current[index]);
        refsArray.current[index].style.display = "block";
        notify(`${user.name} has been deleted.`, "success", 3);
        setUsers(getArrayOfUsers());
        props.history.push("/");
      },
      () => {}
    );
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
          return (
            <div
              className="column is-half outerdiv"
              key={index}
              id={index}
              ref={ref => {
                refsArray.current[index] = ref; // took this from your guide's example.
              }}
              onMouseOver={() => {
                refsArray.current[index].classList.add("addTransition");
                refsArray.current[index].style.zIndex = 1000;
                refsArray.current[index].classList.add("hover-effect");
              }}
              onMouseLeave={async () => {
                refsArray.current[index].classList.remove("hover-effect");
                refsArray.current[index].style.zIndex = 0;
                await new Promise(resolve => {
                  setTimeout(resolve, 1000);
                });
                refsArray.current[index].classList.remove("addTransition");
              }}
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
