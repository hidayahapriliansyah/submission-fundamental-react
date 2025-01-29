import React from 'react';
import PropTypes from 'prop-types';
import { LocalConsumer } from '../context/LocaleContext';
import loginTextId from '../constant/page-content-text/id/login';
import loginTextEn from '../constant/page-content-text/en/login';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  async onSubmitHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });

    await this.props.login({
      email: this.state.email,
      password: this.state.password,
    });

    this.setState({ loading: false });
  }

  render() {
    return (
      <LocalConsumer>
        {
          (({ locale }) => {
            return (
              <form onSubmit={this.onSubmitHandler} className="login-input">
                <input
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onEmailChangeHandler}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChangeHandler}
                  autoComplete="current-password"
                />
                <button
                  type="submit"
                  disabled={this.state.loading}
                  style={{ pointerEvents: this.state.loading ? 'none' : 'auto' }}
                >
                  {this.state.loading && 'Loading...'}
                  {!this.state.loading && (locale === 'id'
                    ? loginTextId.submit_btn
                    : loginTextEn.submit_btn)}
                </button>
              </form>
            );
          })
        }
      </LocalConsumer>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
