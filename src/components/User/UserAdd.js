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
    if (formState.dirty === false) {
      return true;
    } else {
      if (errors.name || errors.age || errors.email) {
        return true;
      } else {
        return false;
      }
    }
  }, [errors, formState.dirty]);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2 class="line-container">
          <span>Add a new User</span>
        </h2>
        <hr />
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  ref={register({
                    required: true
                  })}
                />

                <span class="error">
                  {errors.name && "Your name is required"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Age</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  ref={register({
                    validate: {
                      isANumber: value => !isNaN(value),
                      isFillIn: value => value.length > 0
                    }
                  })}
                  class="input"
                  type="text"
                  name="age"
                  placeholder="Age"
                />
                <span class="error">
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

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
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
                <span class="error">
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

        <p class="" style={{ margin: "0 auto", textAlign: "center" }}>
          <button
            type="submit"
            class="button is-primary"
            style={{ marginRight: "10px" }}
            disabled={shouldBeEnabled}
          >
            Create
          </button>
          <button
            onClick={() => {
              console.log(errors);
            }}
          >
            Test
          </button>
          <Link to="/" class="button">
            Cancel
          </Link>
        </p>
      </form>
    </div>
  );
};
export default UserAdd;
