import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { DataTable } from './DataTable';
import {
  getUserComplaints,
  getUserClosedComplaints,
  getUserOpenComplaints,
  getUserTopComplaints,
  getUsersConstituentsComplaints,
} from '../api/ComplaintAPI';

const defaultColumns = [
  { field: 'account', headerName: 'Account', width: 90 },
  { field: 'opendate', headerName: 'Open date', width: 110 },
  { field: 'closedate', headerName: 'Close date', width: 110 },
  { field: 'complaint_type', headerName: 'Type', width: 200 },
  { field: 'descriptor', headerName: 'Descriptor', width: 220 },
  { field: 'council_dist', headerName: 'Council district', width: 120 },
  { field: 'zip', headerName: 'Zip code', width: 90 },
  { field: 'borough', headerName: 'Borough', width: 110 },
  { field: 'city', headerName: 'City', width: 110 },
  { field: 'community_board', headerName: 'Community board', width: 130 },
];

const topComplaintsColumns = [
  { field: 'complaint_type', headerName: 'Type', width: 240 },
  { field: 'complaint_type_count', headerName: 'Occurrence', width: 100 },
];

const setComplaintId = (complaint) => ({ ...complaint, id: complaint.unique_key });
const logOut = (setToken) => {
  setToken(undefined);
  sessionStorage.clear();
};
export function Dashboard({ token, setToken, username }) {
  const [value, setValue] = useState('1');
  const [complaints, setComplaints] = useState([]);
  const [openCases, setOpenCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [topComplaints, setTopComplaints] = useState([]);
  const [constituentsComplaints, setConstituentsComplaints] = useState([]);
  const firstNameInitial = username[0].toUpperCase();
  const LastNameInitial = username[1].toUpperCase();
  const userWelcome = `Welcome, ${firstNameInitial}. ${LastNameInitial}${username.slice(2)}`;
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function fetch() {
      try {
        const allComplaints = await getUserComplaints(token);
        const openCases = await getUserOpenComplaints(token);
        const closedCases = await getUserClosedComplaints(token);
        const topComplaints = await getUserTopComplaints(token);
        const constituentsComplaints = await getUsersConstituentsComplaints(token);
        setComplaints(allComplaints.map(setComplaintId));
        setOpenCases(openCases.map(setComplaintId));
        setClosedCases(closedCases.map(setComplaintId));
        setTopComplaints(topComplaints.map((e) => ({ ...e, id: e.complaint_type })));
        setConstituentsComplaints(constituentsComplaints.map(setComplaintId));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch();
  }, [token]);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
      <Stack direction="row" spacing={2} alignItems="center" ml={2} mt={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 30, height: 30, bgcolor: blue[500] }}>
            {firstNameInitial + LastNameInitial}
          </Avatar>
          <Typography mt={5} ml={5} variant="h6" style={{ fontSize: 13, color: 'royalblue' }}>
            {userWelcome}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ '& button': { m: 1 } }}>
          <Button
            variant="contained"
            size="small"
            style={{ marginTop: 5, marginLeft: 5, fontSize: 10 }}
            onClick={() => logOut(setToken)}
          >
            Log Out
          </Button>
        </Box>
      </Stack>
      {/* </div> */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2, marginLeft: 5 }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Complaints" value="1" />
            <Tab label="Open Cases" value="2" />
            <Tab label="Closed Cases" value="3" />
            <Tab label="Top Complaints" value="4" />
            <Tab label="Complaints by My Constituents" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DataTable columns={defaultColumns} rows={complaints} />
        </TabPanel>
        <TabPanel value="2">
          <DataTable columns={defaultColumns} rows={openCases} />
        </TabPanel>
        <TabPanel value="3">
          <DataTable columns={defaultColumns} rows={closedCases} />
        </TabPanel>
        <TabPanel value="4">
          <DataTable columns={topComplaintsColumns} rows={topComplaints} isTopComplaints />
        </TabPanel>
        <TabPanel value="5">
          <DataTable columns={defaultColumns} rows={constituentsComplaints} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
