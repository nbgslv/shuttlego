import { Errors } from 'react-redux-form';
import React from 'react';

const ErrorMessage = ({modelName, messages}) => (
  <Errors
    model={modelName}
    show={field => !field.pristine}
    component="p"
    messages={messages}
  />
);

export default ErrorMessage;
