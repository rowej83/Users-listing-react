import React from "react";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { saveUserToLocalStorage } from "../../utils/StorageHelper";
import { User } from "../../utils/UserClass";
import { confirm, notify } from "alertifyjs";
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const UserAdd = props => {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = values => {
    confirm(
      "Add User",
      `Add user: <b>${values.name}</b>?`,
      function() {
        saveUserToLocalStorage(new User(values.name, values.age, values.email));
        notify(`${values.name} has been added.`, "success", 3);
        props.history.push("/");
      },
      function() {
        console.log("not added");
      }
    );
  };
  const shouldBeEnabled = React.useMemo(() => {
    if (formState.dirty === false || formState.touched.length !== 3) {
      return true;
    } else {
      if (errors.name || errors.age || errors.email) {
        return true;
      } else {
        return false;
      }
    }
  }, [errors, formState]);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2 className="line-container">
          <span>Add a new User</span>
        </h2>
        <hr />
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  ref={register({
                    required: true
                  })}
                />

                <span className="error">
                  {errors.name && "Your name is required"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Age</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  ref={register({
                    validate: {
                      isANumber: value => !isNaN(value),
                      isFillIn: value => value.length > 0
                    }
                  })}
                  className="input"
                  type="text"
                  name="age"
                  placeholder="Age"
                />
                <span className="error">
                  {errors.age && errors.age.type === "isANumber" && (
                    <span>Your age is invalid</span>
                  )}
                  {errors.age && errors.age.type === "isFillIn" && (
                    <span>Your age is required.</span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Email</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={register({
                    required: "field is required",
                    validate: {
                      checkIfEmail: value => validateEmail(value)
                    }
                  })}
                />
                <span className="error">
                  {errors.email && errors.email.type === "required" && (
                    <span>Email field is required.</span>
                  )}
                  {errors.email && errors.email.type === "checkIfEmail" && (
                    <span>Valid email is required.</span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="" style={{ margin: "0 auto", textAlign: "center" }}>
          <button
            type="submit"
            className="button is-primary"
            style={{ marginRight: "10px" }}
            disabled={shouldBeEnabled}
          >
            Create
          </button>

          <Link to="/" className="button">
            Cancel
          </Link>
        </p>
      </form>
    </div>
  );
};
export default UserAdd;
