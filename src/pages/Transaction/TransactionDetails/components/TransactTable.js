import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetTransactionDetails } from 'api/transactions';



const itemPerPage = 5


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow  sx={{ '& > *': { borderBottom: 'none'} }}>
        
       
        <TableCell width={300} sx={{paddingLeft:'50px', borderBottom:'none'}}  >{row.description}</TableCell>
        <TableCell align="right" sx={{ borderBottom:'none'}}>{row.amount}</TableCell>
        <TableCell align="right" sx={{ borderBottom:'none'}}>{row.lastModifiedOn}</TableCell>
        <TableCell align="right" sx={{borderBottom:'none',
            color:`${row.status === 'failed' ? 'red' : '#25B883'}`,
            }}>
            <Typography variant='' sx={{background:`${row.status === 'failed' ? '#FEEFF0' : '#E9F8F3'}`,
            padding: '4px 16px', textAlign:'center', borderRadius: '22px'}}>{row.status}</Typography>
        </TableCell>

        <TableCell sx={{borderBottom:'none', borderTop:'1.6px solid #EBEEEF'}} >
        <Box    aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}>
        {open ? <Box sx={{display:'flex', gap:'10px'}}>
            <Typography variant='h5' color='#000' paddingLeft={5}>Collapse</Typography>
            <KeyboardArrowUpIcon />
            </Box>  : <Box sx={{display:'flex', gap:'10px'}}>
            <Typography variant='h5' color='#000' paddingLeft={5} >View Details</Typography>
            <KeyboardArrowDownIcon />  </Box> }
           
      </Box>
    </TableCell>
        
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="small" aria-label="purchases" sx={{width:'97%', marginTop:'30px'}} >
                <TableHead >
                  <TableRow>
                    <TableCell sx={{borderBottom:'none', paddingLeft:'30px', width:'400px', color:'#7C7A78'}}>REFERENCE NUMBER</TableCell>
                    <TableCell align="left" sx={{borderBottom:'none',   color:'#7C7A78', paddingLeft:'-150px'}}>BANK NUMBER</TableCell>
                    <TableCell align="right" sx={{borderBottom:'none',  color:'#7C7A78'}}>PAYMENT MODE</TableCell>
                    <TableCell align="right" sx={{borderBottom:'none',  color:'#7C7A78'}}>BANK ACCOUNT NO</TableCell>
                    <TableCell align="right" sx={{borderBottom:'none',  color:'#7C7A78'}}> ACCOUNT NAME</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
              
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    description: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    lastModifiedOn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        businessId: PropTypes.string.isRequired,
        bankName: PropTypes.string.isRequired,
        paymentMode: PropTypes.string.isRequired,
        accountNo: PropTypes.string.isRequired,
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};


export default function TransactTable({ transId }) {
  const { data, isLoading, isError } = useGetTransactionDetails(transId);
  const transactionDetails = data?.data || [];
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell sx={{paddingLeft:'50px'}} >DESCRIPTION</TableCell>
            <TableCell align="right"  sx={{paddingLeft:'100px'}}>AMOUNT</TableCell>
            <TableCell align="right"  sx={{paddingLeft:'100px'}}>DATE & TIME</TableCell>
            <TableCell align="right" sx={{paddingLeft:'100px'}}>STATUS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {transactionDetails.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


