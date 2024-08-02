import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ContainerUsage(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xlg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }} />
        {props.children}
      </Container>
    </React.Fragment>
  );
}
