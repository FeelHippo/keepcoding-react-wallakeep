import React, { useState, useCallback, createContext } from 'react';

// Creamos un contexto para el formulario
export const formContext = createContext();
export const { Provider: FormProvider, Consumer: FormConsumer } = formContext;

// Hoc para conectar cualquier componente con el contexto del formulario
// Se puede conectar tambien con useContext(formContext)
export function withFormContext(WrappedComponent) {
  return function(props) {
    return (
      <FormConsumer>
        {value => <WrappedComponent {...props} {...value} />}
      </FormConsumer>
    );
  };
}

// Componente Form
// Mantiene el valor del formulario (empezando con un initialValue)
// Pone en el contexto el valor y la funcion para cambiar el valor
// Valida los datos en el submit, produciendo un error o haciendo el submit con el valor
export default function Form({
  initialValue = {},
  validate = () => null,
  onSubmit = () => {},
  onError = () => {},
  children,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(change => {
    setValue(prevValue => ({
      ...prevValue,
      ...change,
    }));
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const error = validate(value);
      if (error) {
        return onError(error);
      }
      onSubmit(value);
    },
    [onError, onSubmit, validate, value],
  );

  return (
    <form {...props} onSubmit={handleSubmit}>
      <FormProvider value={{ value, handleChange }}>{children}</FormProvider>
    </form>
  );
}
