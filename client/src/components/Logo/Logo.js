import React from 'react';
import fieldLogo from 'client/src/components/Logo/field-logo.svg';

function Logo() {
  return (
    <img alt="Field Logo" style={{ width: '200px', height: 'auto' }} src={fieldLogo} />
  );
}

export default Logo;
