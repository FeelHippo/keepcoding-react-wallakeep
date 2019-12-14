import React from 'react';

import Layout from '../Layout/Layout';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MaterialUiInput from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import Form, { Input } from '../Form';

import Session from '../../models/Session';
import imagePhoto from '../../assets/images/user.png';

import './Profile.css';

export default function Profile({
  session,
  saveSession,
  enqueueSnackbar,
  userLogout,
}) {
  const handleSubmit = value => {
    const { name, surname, maxAdverts } = value;
    const parsedMaxAdverts = parseInt(maxAdverts);
    // Genero sesión y la guardo en LS
    saveSession(
      new Session(name, surname, session.apiUrl, parsedMaxAdverts),
      true,
    );
    enqueueSnackbar('Perfil de usuario actualizado correctamente.', {
      variant: 'success',
    });
  };

  return (
    <Layout sectionTitle="Perfil de usuario">
      <Form
        initialValue={session}
        validate={({ name, surname, maxAdverts }) => {
          const parsedMaxAdverts = parseInt(maxAdverts);
          if (
            !name ||
            !surname ||
            !Number.isInteger(parsedMaxAdverts) ||
            parsedMaxAdverts <= 0
          ) {
            return 'Rellene todos los campos del formulario';
          }
        }}
        onSubmit={handleSubmit}
        onError={error => enqueueSnackbar(error, { variant: 'error' })}
        autoComplete="off"
        className="Profile__Form"
      >
        <div className="Profile_Picture">
          <img src={imagePhoto} alt="user_avatar" />
        </div>
        <FormControl fullWidth className="Profile__FormControl">
          <InputLabel shrink htmlFor="type">
            Nombre
          </InputLabel>
          <Input name="name" type="text" component={MaterialUiInput} />
        </FormControl>
        <FormControl fullWidth className="Profile__FormControl">
          <InputLabel shrink htmlFor="type">
            Apellido
          </InputLabel>
          <Input name="surname" type="text" component={MaterialUiInput} />
        </FormControl>
        <FormControl fullWidth className="Profile__FormControl">
          <InputLabel htmlFor="maxAdverts">
            Anuncios por página (Home)
          </InputLabel>
          <Input
            name="maxAdverts"
            type="number"
            min={1}
            max={20}
            component={MaterialUiInput}
          />
        </FormControl>
        <div className="Profile__Footer">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            className="ButtonWallakeep ButtonWallakeep__Green"
          >
            Guardar
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={userLogout}
            startIcon={<DeleteIcon />}
          >
            Borrar
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
