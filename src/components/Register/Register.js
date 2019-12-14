import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MaterialUiInput from '@material-ui/core/Input';

import Form, { Input } from '../Form';

import Session from '../../models/Session';
import imageLogo from '../../assets/images/logo2.png';
import './Register.css';

export default function Register({ userLogin, enqueueSnackbar, endAdornment }) {
  const handleSubmit = value => {
    const { name, surname, remember } = value;
    // Genero sesión y la guardo en LS si ha seleccionado "remember"
    userLogin(new Session(name, surname), remember);
  };

  return (
    <div className="Register">
      <div className="Register__Wrapper">
        <Form
          className="Register__Form"
          initialValue={{ name: '', surname: '', remember: false }}
          validate={({ name, surname }) => {
            if (!name || !surname) {
              return 'Rellene todos los campos del formulario';
            }
          }}
          onSubmit={handleSubmit}
          onError={error =>
            enqueueSnackbar(error, {
              variant: 'error',
            })
          }
        >
          <img src={imageLogo} className="Register__Logo" alt="nodepop-logo" />
          <FormControl>
            <Input
              name="name"
              type="text"
              placeholder="type your name"
              autoComplete="username"
              startAdornment={
                <InputAdornment position="start" className="InputIcon__Icon">
                  <AccountCircleIcon />
                </InputAdornment>
              }
              endAdornment={endAdornment}
              component={MaterialUiInput}
            />
          </FormControl>
          <FormControl>
            <Input
              name="surname"
              type="text"
              placeholder="type your surname"
              startAdornment={
                <InputAdornment position="start" className="InputIcon__Icon">
                  <AccountCircleIcon />
                </InputAdornment>
              }
              endAdornment={endAdornment}
              component={MaterialUiInput}
            />
          </FormControl>
          <Input
            name="remember"
            type="checkbox"
            label="remember me"
            control={<Checkbox color="primary" />}
            component={FormControlLabel}
          />
          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
