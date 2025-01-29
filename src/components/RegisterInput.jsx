import React from 'react';
import PropTypes from 'prop-types';
import { LocalConsumer } from '../context/LocaleContext';
import registerTextId from '../constant/page-content-text/id/register';
import registerTextEn from '../constant/page-content-text/en/register';

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      loading: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  async onSubmitHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });

    await this.props.register({
      name: this.state.name,
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

              <form onSubmit={this.onSubmitHandler} className="register-input">
                <input
                  type="text"
                  placeholder={locale === 'id' ? registerTextId.form.name : registerTextEn.form.name}
                  value={this.state.name}
                  onChange={this.onNameChange}
                />
                <input
                  type="email"
                  placeholder={locale === 'id' ? registerTextId.form.email : registerTextEn.form.email}
                  value={this.state.email}
                  onChange={this.onEmailChange}
                />
                <input
                  type="password"
                  placeholder={locale === 'id' ? registerTextId.form.password : registerTextEn.form.password}
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
                <button
                  type="submit"
                  disabled={this.state.loading}
                  style={{ pointerEvents: this.state.loading ? 'none' : 'auto' }}
                >
                  {this.state.loading && 'Loading...'}
                  {!this.state.loading && (locale === 'id'
                    ? registerTextId.submit_btn
                    : registerTextEn.submit_btn)}
                </button>
              </form>
            );
          })
        }
      </LocalConsumer>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
