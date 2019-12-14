import React, { useCallback } from 'react';

import { withFormContext } from './Form';

// Comnponente Input
// Se conecta al contexto del formulario (con hoc o useContext)
// Toma del contexto el valor del formulario y la funcion para cambiar el valor
// Pasa el valor y la funcion a un elemento input basandose en el name y el type
// Puede renderizar cualquier componente que le enviemos por la prop 'component'
// Si no le pasamos prop 'component' crea un input basico
function Input({
  component: Component = 'input',
  handleChange: formHandleChange,
  value: formValue,
  ...props
}) {
  const { name, type } = props;

  const valueKey = useCallback(
    ({ checked, value }) => (type === 'checkbox' ? checked : value),
    [type],
  );

  const handleChange = useCallback(
    ({ target }) => {
      formHandleChange({ [name]: valueKey(target) });
    },
    [formHandleChange, valueKey, name],
  );

  const inputProps = {
    onChange: handleChange,
    [valueKey({ checked: 'checked', value: 'value' })]: formValue[name],
  };

  return <Component {...props} {...inputProps} />;
}

// Exportamos por defecto el componente conectado al contexto
export default withFormContext(Input);
