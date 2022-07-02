import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

// function createData(name, first, second, third) {
//   return { name, first, second, third};
// }

// const rows = [
//   createData('テスト1', "15:00~20:00", "15:00~20:00", "15:00~20:00"),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   // createData('Eclair', 262, 16.0, 24, 6.0),
//   // createData('Cupcake', 305, 3.7, 67, 4.3),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ShiftTable() {

  const [users, setUsers] = useState(null)
  const [tables, setTables] = useState(null)


  useEffect(() => {
    axios
    .get('http://localhost:8000/api-auth/users/',{
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    })
    .then(res=>{setUsers(res.data);
                console.log(res.data);})
    .catch(err=>{console.log(err);});
    }, []);

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/store/',{
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    })
    .then(res=>{setStores(res.data);
                console.log(res.data);})
    .catch(err=>{console.log(err);});
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>5月シフト</TableCell>
            <TableCell align="center">5/1（月）</TableCell>
            <TableCell align="center">5/2（月）</TableCell>
            <TableCell align="center">5/3（月）</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.last_name + " " + user.first_name}</TableCell>
              {/* <TableCell align="right">{row.first}</TableCell>
              <TableCell align="right">{row.second}</TableCell>
              <TableCell align="right">{row.third}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}