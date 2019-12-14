import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Session from '../../models/Session';
import imageLogo from '../../assets/images/logo2.png';
import './Register.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      remember: false,
    };
  }

  render() {
    const { name, surname, remember } = this.state;
    const { endAdornment } = this.props;
    return (
      <div className="Register">
        <div className="Register__Wrapper">
          <form className="Register__Form" onSubmit={this.handleSubmit}>
            <img
              src={imageLogo}
              className="Register__Logo"
              alt="nodepop-logo"
            />
            <FormControl>
              <Input
                name="name"
                value={name}
                onChange={this.handleChange}
                type="text"
                placeholder="type your name"
                autoComplete="username"
                startAdornment={
                  <InputAdornment position="start" className="InputIcon__Icon">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
                endAdornment={endAdornment}
                required
              />
            </FormControl>
            <FormControl>
              <Input
                name="surname"
                value={surname}
                onChange={this.handleChange}
                type="text"
                placeholder="type your surname"
                startAdornment={
                  <InputAdornment position="start" className="InputIcon__Icon">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
                endAdornment={endAdornment}
                required
              />
            </FormControl>
            <FormControlLabel
              name="remember"
              label="remember me"
              control={
                <Checkbox
                  color="primary"
                  checked={remember}
                  onChange={this.handleChange}
                />
              }
            />
            <Button
              className="button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = async event => {
    const { userLogin, enqueueSnackbar } = this.props;
    const { name, surname, remember } = this.state;
    event.preventDefault();

    // Validación básica del formulario
    if (!name || !surname) {
      enqueueSnackbar('Rellene todos los campos del formulario', {
        variant: 'error',
      });
      return;
    }
    // Genero sesión y la guardo en LS si ha seleccionado "remember"
    userLogin(new Session(name, surname), remember);
  };

  handleChange = ({ target }) => {
    const { name, type, checked, value } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };
}
