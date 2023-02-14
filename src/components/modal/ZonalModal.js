import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import generateUserId from '../../helpers/generateUserID';

const ZonalModal = ({ subTitle, handleOpenModal, handleOpenEditModal, open, val }) => {
  const [email, setEmail] = useState(val ? val?.email : '');
  const [fullName, setFullName] = useState(val ? val?.fullname : '');
  const [accountId, setAccountId] = useState(val ? val?.accountId : '');
  const [phone, setPhone] = useState(val ? val?.phone : '');
  const [error, setError] = useState('');
  const [zone, setZone] = useState('');

  const editPlan = (data) => {
    axios
      .put(`http://localhost:4000/api/subscription/data/${val._id}`, data)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        handleOpenEditModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // const createZonal = async (data) => {
  //   try {
  //     axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
  //     // axios.defaults.withCredentials = true;
  //     console.log(data);
  //     await axios
  //       .post(
  //         'https://n55emvo7xb.execute-api.us-east-2.amazonaws.com/default/InfrastructureStack-createaccountlambda8D7DD6A6-L3cbl8GbfwVS',
  //         data,
  //         {
  //           headers: {
  //             'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  //             'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  //             'Access-Control-Allow-Origin': '*',
  //             'Content-Type': 'application/json',
  //           },
  //           // mode: 'no-cors',
  //         }
  //       )
  //       .then((res) => {
  //         alert('Zonal is created successfully!');
  //         handleOpenModal();
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert('An error occurred, please try again.');
  //       });
  //   } catch (err) {
  //     console.error('Err', err);
  //   }
  // };
  const createZonal = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        'https://n55emvo7xb.execute-api.us-east-2.amazonaws.com/default/InfrastructureStack-createaccountlambda8D7DD6A6-L3cbl8GbfwVS',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.ok) {
        alert('Zonal is created successfully!');
        handleOpenModal();
        console.log(response);
      } else {
        console.error(`Error: ${response.status}`);
        alert('An error occurred, please try again.');
      }
    } catch (error) {
      console.error('Err', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !accountId || !zone || !phone || !fullName) {
      setError('All fields are required');
      return;
    }
    // const data = {
    //   accountId,
    //   email,
    //   fullname: fullName,
    //   password: accountId,
    //   zone,
    //   phone,
    //   role: 'zonal',
    // };
    const data = {
      accountId: '981323567',
      email: 'valu2@ssaas.com',
      fullname: 'dadasd',
      password: 'BUNSHino1818',
      zone: 'Kankia',
      role: 'agent',
      village: 'subkankia',
      phone: '0802322334',
      voters_card: '{link}',
    };

    if (val) {
      editPlan(data);
    } else {
      createZonal(data);
    }
  };

  useEffect(() => {
    setAccountId(generateUserId({ role: 'zo', zone }));
  }, [zone]);

  return (
    <div>
      <Modal
        open={open}
        onClose={val ? handleOpenEditModal : handleOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <Box style={{ width: '396px', padding: 30, backgroundColor: 'aliceblue', borderRadius: 10 }}>
          <FormControl fullWidth>
            <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
              {subTitle}
            </Typography>
            {zone ? (
              <Typography
                variant="p"
                component="p"
                mb={3}
                style={{
                  position: 'absolute',
                  left: '40%',
                  // border: '1px solid black',
                  borderRadius: 6,
                  padding: '2px 5px',
                  fontSize: 14,
                  backgroundColor: '#dfe8e1',
                  textTransform: 'uppercase',
                }}
              >
                {accountId}
              </Typography>
            ) : (
              <Typography
                variant="p"
                component="p"
                mb={3}
                style={{
                  position: 'absolute',
                  left: '40%',
                  // border: '1px solid black',
                  borderRadius: 6,
                  padding: '2px 5px',
                  fontSize: 14,
                  backgroundColor: '#dfe8e1',
                  textTransform: 'uppercase',
                }}
              >
                Account ID
              </Typography>
            )}
            <IconButton
              onClick={val ? handleOpenEditModal : handleOpenModal}
              aria-label="Close"
              style={{
                width: '30px',
                height: '30px',
                position: 'absolute',
                right: 0,
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </IconButton>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              id="fullname"
              label="Full Name"
              fullWidth
              value={fullName}
              style={{ marginBottom: '1rem' }}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              fullWidth
              type={'email'}
              value={email}
              style={{ marginBottom: '1rem' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="phone"
              label="Phone Number"
              fullWidth
              value={phone}
              style={{ marginBottom: '1rem' }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormControl>
              <InputLabel id="select-label">Select Zone</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={zone}
                style={{ marginBottom: '1rem' }}
                onChange={(e) => setZone(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="katsina">Katsina</MenuItem>
                <MenuItem value="funtua">Funtua</MenuItem>
                <MenuItem value="daura">Daura</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
export default ZonalModal;
