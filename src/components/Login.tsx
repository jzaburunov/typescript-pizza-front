import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Link } from "react-router-dom";
import { login as loginAction, LoginDataInterface } from "../actions/login";
import { renderField } from "./utils";
import { StoreState } from "../reducers";

interface LoginInterface extends InjectedFormProps<LoginDataInterface> {
  login(props: LoginDataInterface): Function;
  errMsg: {};
}

class _Login extends React.Component<LoginInterface> {
  componentDidMount() {
    // this.props.cleanErrors();
  }

  // TODO change to proper type
  onSubmit = (props: LoginDataInterface) => {
    this.props.login(props);
  };

  render() {
    const { handleSubmit, errMsg } = this.props;

    return (
      <div className="bg row justify-content-center">
        <div
          id="auth-padding"
          className="col col-xl-4 col-lg-5 col-md-7 col-sm-9 col-12"
        >
          <h1 className="text-center">Login</h1>
          <div id="form-bg" className="element-bg">
            <form className="fields" onSubmit={handleSubmit(this.onSubmit)}>
              <Field
                label="Email"
                name="email"
                component={renderField}
                placeholder="tyler.newman@jumperco.com"
                type="email"
              />
              <Field
                label="Password"
                name="password"
                component={renderField}
                placeholder="Your password"
                type="password"
                link="true"
              />
              {errMsg && (
                <div className="auth-err-msg">
                  <p className="verify-title">{errMsg}</p>
                </div>
              )}
              <button
                type="submit"
                id="auth-button"
                className="btn btn-block general-btn"
              >
                Login
              </button>
            </form>
            <p id="auth-link" className="general-text text-center">
              {"Don't have an account yet?"}
              <Link to="signup">
                <span>Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (values: { login: string; password: string }) => {
  const errors: { login: string; password: string } = {
    login: "",
    password: "",
  };

  if (!values.login) {
    errors.login = "Enter an login";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Enter a password with 6+ characters";
  }

  return errors;
};

function mapStateToProps(state: StoreState) {
  // TODO Handle auth error
  return {
    // errMsg: state.auth.error,
    errMsg: "",
  };
}

export const Login = reduxForm({
  form: "LoginForm",
  validate,
})(
  connect(mapStateToProps, {
    login: loginAction,
  })(_Login)
);
