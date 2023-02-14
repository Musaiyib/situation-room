import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [trx, setTrx] = useState();
  const [airtimePlan, setAirtimePlan] = useState();
  const [dataPlan, setDataPlan] = useState();
  const user = JSON.parse(localStorage.getItem('airtime'));
  if (!user) navigate('../login', { replace: true });
  const theme = useTheme();
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users/allusers')
      .then((res) => {
        setUsers(res.data.users.filter((user) => user.role !== 'admin'));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:4000/api/transaction/')
      .then((res) => {
        setTrx(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:4000/api/subscription/airtime/addplan')
      .then((res) => {
        setAirtimePlan(res.data.airtimePlan);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('http://localhost:4000/api/subscription/data/addplan')
      .then((res) => {
        setDataPlan(res.data.dataPlan);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Data & Airtime </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Transactions" total={trx ? trx.length : 0} icon={'ic:baseline-list-alt'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Users"
              total={users ? users.length : 0}
              color="info"
              icon={'clarity:users-solid-badged'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Airtime Plan"
              total={airtimePlan ? airtimePlan.length : 0}
              color="warning"
              icon={'material-symbols:phone-callback'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Data Plan"
              total={dataPlan ? dataPlan.length : 0}
              color="error"
              icon={'mdi:internet'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
