import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { General } from './General/General';

const Configuration = () => {
  return (
    <Container component="main" maxWidth="xl">
      <Typography variant="h4">
        General
      </Typography>
      <General />
    </Container>
  );
};
