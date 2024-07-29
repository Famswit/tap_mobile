import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import { useEffect } from 'react';
import TransactDetails from './TransactDetails';
import { useGetTransactions } from 'api/transactions';




const itemPerPage = 5

function data(id, businessName, amount, transId, date, protein) {
  return {
    id,
    businessName,
    amount,
    transId,
    date,
    protein,
  };
}




const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'BUSINESS NAME',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'TOTAL AMOUNT',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'TRANSACTION ID',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'DATES & TIME',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount,  } =
    props;
 
  const [tableData, setTableData]=  useState([]);

 


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
            > 
            <Typography variant='h4'>
              {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



const numberOfPage = Math.ceil(data.length / itemPerPage)
const pageIndex = Array.from({length : numberOfPage}, (_, idx) => idx+1)


export default function DashboardTable(props) {
  const { data, isLoading, isError } = useGetTransactions();
  const transaction = data?.data?.transactions || [];
  console.log(data);

  
  const [currentPage, setCurrentPage] = useState(0);
  const row = transaction.slice(currentPage * itemPerPage, currentPage + 1 * itemPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
 

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = transaction.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1; 

  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;



  return (
    <Box sx={{ width: '95%', marginTop:'50px' }}>
      <Box sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={transaction.length}
            />
            <TableBody>
              {transaction.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                    <Checkbox {...label}
                    
                    />

                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    > <Typography variant='h5'>
                      {row.businessName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right"><Typography variant='h5'>{row.amount}</Typography></TableCell>
                    <TableCell align="right"><Typography variant='h5'>{row.transId}</Typography></TableCell>
                    <TableCell align="right"><Typography variant='h5'>{row.createdOn}</Typography></TableCell>
                    <TableCell align="right"><TransactDetails /></TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>
            
          </Table>

          <div className="space-x-2">
          {transaction.map((row) => (
            <rows key={row.name} row={row} />
          ))}
            <Box sx={{display:'flex', gap:'50px'}}>
            <Box sx={{width:'270%', display:'flex', justifyContent:'space-between',
        alignItems:'center', marginLeft:'50px', padding:'20px 0'}}>
        <Typography variant='h5'>
          {' '}
            {currentPage + 1}-{itemPerPage} of {transaction.length}
          {' '}
        </Typography>
        <Box sx={{display:'flex', gap:'5px'}}>
          <Typography variant='h5' sx={{padding:' 8px 20px', cursor:'pointer',
          "&:hover" :{
            background:'var(--Neutral-Divider, #F2F4F4)',
            borderRadius: '6px'
          }
        }}
          disabled={currentPage < 1}
          onClick={() => handlePageChange(currentPage - 1)}>Prev</Typography>
          
          {pageIndex.slice(
            Math.max(0, currentPage -2),
            Math.min(numberOfPage, currentPage + 1)
          )
          .map((page) => (
            <Typography variant='h4' sx={{background: 'var(--Neutral-Divider, #F2F4F4)',
            borderRadius: '6px', padding:' 8px 20px', cursor:'pointer',
              "&:hover":{
                background: 'var(--Neutral-Divider, #F2F4F4)',              }
            }}
            key={page}
            onClick={() => handlePageChange(page - 1)}
            className={page === currentPage + 1 ? "active" : ""}>
           Page {page}
            </Typography>
          ))
        }
        
          
          <Typography 
          variant='h5' sx={{padding:' 8px 20px', cursor:'pointer',
          "&:hover" :{
            background:'var(--Neutral-Divider, #F2F4F4)',
            borderRadius: '6px'
          } }}
          disabled={currentPage > numberOfPage}
           onClick={() => handlePageChange(currentPage + 1)}>Next</Typography>
           </Box>
        </Box>
            </Box>
          </div>
        </TableContainer>
        
      </Box>
     
    </Box>
  );
}