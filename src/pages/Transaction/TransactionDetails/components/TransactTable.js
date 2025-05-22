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
import { useState } from 'react';
import { useGetTransactionDetails } from 'api/transactions';
import { CircularProgress } from '@mui/material';

const itemsPerPage = 5;

// Dummy data for the collapsible table
const dummyTransactionDetails = [
  {
    referenceNumber: "REF123456",
    bankNumber: "BNK789",
    paymentMode: "Credit Card",
    bankAccountNo: "1234567890",
    accountName: "John Doe",
  },
  {
    referenceNumber: "REF654321",
    bankNumber: "BNK456",
    paymentMode: "Bank Transfer",
    bankAccountNo: "0987654321",
    accountName: "Jane Smith",
  },
  {
    referenceNumber: "REF987654",
    bankNumber: "BNK123",
    paymentMode: "Debit Card",
    bankAccountNo: "1122334455",
    accountName: "Emily White",
  },
];

// Dummy parent row data to ensure rendering
const dummyParentRows = [
  {
    id: 1,
    description: "Payment for Order #1001",
    amount: 150.00,
    lastModifiedOn: "2025-04-14 07:00 AM",
    status: "success",
  },
  {
    id: 2,
    description: "Refund for Order #1002",
    amount: 50.00,
    lastModifiedOn: "2025-04-13 03:00 PM",
    status: "failed",
  },
  {
    id: 3,
    description: "Payment for Order #1003",
    amount: 200.00,
    lastModifiedOn: "2025-04-12 09:00 AM",
    status: "success",
  },
];

// Row component (unchanged except for dummy data in TableBody)
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
        <TableCell width={180} sx={{ paddingLeft: '50px', borderBottom: 'none' }}>{row.description}</TableCell>
        <TableCell width={180} align="right" sx={{ borderBottom: 'none' }}>{row.amount}</TableCell>
        <TableCell width={200} align="right" sx={{ borderBottom: 'none' }}>{row.lastModifiedOn}</TableCell>
        <TableCell width={200} align="left" sx={{ borderBottom: 'none', color: `${row.status === 'failed' ? 'red' : '#25B883'}` }}>
          <Typography variant='body1' sx={{
            background: `${row.status === 'failed' ? '#FEEFF0' : '#E9F8F3'}`,
            padding: '4px 16px',
            textAlign: 'center',
            borderRadius: '22px'
          }}>
            {row.status}
          </Typography>
        </TableCell>
        <TableCell width={200} sx={{ borderBottom: 'none', borderTop: '1.6px solid #EBEEEF' }}>
          <Box aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography variant='h5' color='#000' paddingLeft={5}>Collapse</Typography>
                <KeyboardArrowUpIcon />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography variant='h5' color='#000' paddingLeft={5}>View Details</Typography>
                <KeyboardArrowDownIcon />
              </Box>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="small" aria-label="purchases" sx={{ width: '97%', marginTop: '30px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ borderBottom: 'none', paddingLeft: '30px', width: '210px', color: '#7C7A78' }}>REFERENCE NUMBER</TableCell>
                    <TableCell align='right' sx={{ borderBottom: 'none', color: '#7C7A78', paddingLeft: '40px' }}>BANK NUMBER</TableCell>
                    <TableCell align="right" sx={{ borderBottom: 'none', color: '#7C7A78', paddingLeft: "40px" }}>PAYMENT MODE</TableCell>
                    <TableCell align="right" sx={{ borderBottom: 'none', color: '#7C7A78' }}>BANK ACCOUNT NO</TableCell>
                    <TableCell align="right" sx={{ borderBottom: 'none', color: '#7C7A78' }}>ACCOUNT NAME</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyTransactionDetails.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ paddingLeft: '30px', borderBottom: 'none' }}>{detail.referenceNumber}</TableCell>
                      <TableCell align="right" sx={{ borderBottom: 'none', paddingLeft: '40px' }}>{detail.bankNumber}</TableCell>
                      <TableCell align="right" sx={{ borderBottom: 'none', paddingLeft: "40px" }}>{detail.paymentMode}</TableCell>
                      <TableCell align="right" sx={{ borderBottom: 'none' }}>{detail.bankAccountNo}</TableCell>
                      <TableCell align="right" sx={{ borderBottom: 'none' }}>{detail.accountName}</TableCell>
                    </TableRow>
                  ))}
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
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    lastModifiedOn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

// Main TransactTable component (updated with dummy data fallback and fixed pagination)
export default function TransactTable() {
  const { data, isLoading, isError } = useGetTransactionDetails();
  const transactionDetails = data?.data?.transactions || [];
  console.log("API call response:", data);

  const [currentPage, setCurrentPage] = React.useState(0);

  // Use dummy parent rows if transactionDetails is empty
  const displayData = transactionDetails.length > 0 ? transactionDetails : dummyParentRows;

  // Fixed pagination calculation
  const numberOfPage = Math.ceil(displayData.length / itemsPerPage);

  console.log("Transactions:", displayData);

  const currentData = displayData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const visiblePages = [];
  for (let i = Math.max(0, currentPage - 1); i <= Math.min(numberOfPage - 1, currentPage + 1); i++) {
    visiblePages.push(i);
  }
  
  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < numberOfPage) setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', marginLeft: "-200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingLeft: '50px' }}>DESCRIPTION</TableCell>
              <TableCell align="right" sx={{ paddingLeft: '100px' }}>AMOUNT</TableCell>
              <TableCell align="right" sx={{ paddingLeft: '100px' }}>DATE & TIME</TableCell>
              <TableCell align="right" sx={{ paddingLeft: '100px' }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <Row key={row.id || index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/** pagination control */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h6">
          {`${currentPage * itemsPerPage + 1}-${Math.min((currentPage + 1) * itemsPerPage, displayData.length)} of ${displayData.length}`}
        </Typography>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography
            variant="h6"
            sx={{
              padding: '8px 20px',
              cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
              background: currentPage > 0 ? 'none' : '#f2f2f2',
              borderRadius: '6px',
              "&:hover": { background: currentPage > 0 ? '#F2F4F4' : 'none' },
            }}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Typography>

          {visiblePages.map((page) => (
            <Typography
              key={page}
              variant="h6"
              sx={{
                padding: '8px 20px',
                cursor: 'pointer',
                background: currentPage === page ? '#E0E0E0' : 'none',
                borderRadius: '6px',
                "&:hover": { background: '#F2F4F4' },
              }}
              onClick={() => handlePageChange(page)}
            >
              {page + 1}
            </Typography>
          ))}

          <Typography
            variant="h6"
            sx={{
              padding: '8px 20px',
              cursor: currentPage < numberOfPage - 1 ? 'pointer' : 'not-allowed',
              background: currentPage < numberOfPage - 1 ? 'none' : '#f2f2f2',
              borderRadius: '6px',
              "&:hover": { background: currentPage < numberOfPage - 1 ? '#F2F4F4' : 'none' },
            }}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}