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

import { useState } from 'react';
import { useGetActivityLog } from 'api/activity';


const itemPerPage = 8

function data(id, name,  description, createdOn, ) {
  return {
    id,
    name,
    description,
    createdOn,
  };
}




const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: ' NAME',
  },
 
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'ACTION DETAILS',
  },
  {
    id: 'createdOn',
    numeric: true,
    disablePadding: false,
    label: 'DATES & TIME',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  const numberOfPage = Math.ceil(data.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
         
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
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



export default function ActivityTable(props) {

  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useGetActivityLog();
  const activityLog = data?.data?.activitylogs?.activityLogs || [];
  console.log(data);

  const row = activityLog.slice(currentPage * itemPerPage, currentPage + 1 * itemPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
 

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = activityLog.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1; 

 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Box sx={{ width: '95%', marginTop:'50px' }}>
      <Box sx={{ mb: 2 }}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={activityLog.length}
            />
            <TableBody>
              {activityLog.map((row, index) => {
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
                    
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      sx={{paddingRight:'200px'}}
                    > <Typography variant='h5'>
                      {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{paddingRight:'200px'}}
                    ><Typography variant='h5'>{row.description}</Typography></TableCell>
                    <TableCell ><Typography variant='h5'>{row.createdOn}</Typography></TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>
            
          </Table>

          <div className="space-x-2">
          {activityLog.map((row) => (
            <rows key={row.name} row={row} />
          ))}
            <Box sx={{display:'flex', gap:'50px'}}>
            <Box sx={{width:'270%', display:'flex', justifyContent:'space-between',
        alignItems:'center', marginLeft:'50px', padding:'20px 0'}}>
        <Typography variant='h5'>
          {' '}
            {currentPage + 1}-{itemPerPage} of {activityLog.length}
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