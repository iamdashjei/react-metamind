import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Avatar, Button, Grid } from '@mui/material';
import { DELETE_USER_URL } from '../constant/Constants';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EnhancedTable(tableData) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [id, setID] = React.useState(null);
  const [tempUser, setTempUser] = React.useState(() => {
    const saved = localStorage.getItem("users");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpen = (event, param) => {
    setOpen(true);
    setFirstName(param.first_name);
    setLastName(param.last_name);
    setEmail(param.email);
    setAvatar(param.avatar);
    setID(param.id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios.delete(DELETE_USER_URL)
    .then((response) => {
      console.log(response);
      handleClose();
      handleSnackbarClick();
    });
  };

  const handleSnackbarClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  
  return (
    <Box sx={{ mx: 'auto' }}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          User Deleted!
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400}}>
          
          <Typography variant="h5">
          {firstName} {lastName}
          </Typography>
          <Typography sx={{ mb: 5 }}>
              {email} | ID {id}
          </Typography>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
            Delete
          </Button>
        
        </Box>
      </Modal>
      <Card variant="outlined">
        <React.Fragment>
            <CardContent align='center'>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 16 }}>
              {
                tableData.tableData.map((row, i) => {
                  return (
                    <Grid item xs={2} sm={4} md={4} key={i} sx={{ mb: 1 }} >
                      <Box onClick={event => handleOpen(event, row)}>
                        <Avatar src={row.avatar} sx={{ height: '150px', width: '150px' }}/>
                        <Typography variant="h5">
                          {row.first_name} {row.last_name}
                        </Typography>
                        <Typography>
                          {row.email}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })
              }
              </Grid>
            </CardContent> 
        </React.Fragment>
      </Card>
    </Box>
  );
 
}