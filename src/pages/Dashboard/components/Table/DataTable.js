import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TransactDetails from './TransactDetails';
import { useGetTransactions } from 'api/transactions';

const itemsPerPage = 4;

export default function DashboardTable() {
  const { data, isLoading, isError } = useGetTransactions();
  const transactions = data?.data?.transactions || [];
  console.log("API call response:", data);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  console.log("Transactions:", transactions);

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
  };

  // Data for the current page
  const currentData = transactions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  console.log("Current page data:", currentData);

  // Define visible page numbers
  const visiblePages = [];
  for (let i = Math.max(0, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    visiblePages.push(i);
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', marginLeft:"-200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  // if (isError) {
  //   return (
  //     <Alert severity="error" sx={{ width:"95%", textAlign: 'center', marginTop: '20px' }}>
  //       Error fetching transactions. Please try again later.
  //     </Alert>
  //   );
  // }

  // if (transactions.length === 0) {
  //   console.error('No transactions found');
  //   return (
  //     <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
  //       No transactions available.
  //     </Typography>
  //   );
  // }

  return (
    <Box sx={{ width: '95%', marginTop: '50px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>BUSINESS NAME</TableCell>
              <TableCell align="right">TOTAL AMOUNT</TableCell>
              <TableCell align="right">TRANSACTION ID</TableCell>
              <TableCell align="right">DATES & TIME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id || Math.random()}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{row.businessName || "N/A"}</TableCell>
                <TableCell align="right">{row.amount || 0}</TableCell>
                <TableCell align="right">{row.transId || "N/A"}</TableCell>
                <TableCell align="right">{row.createdOn || "N/A"}</TableCell>
                <TableCell align="right"><TransactDetails /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h6">
          {`${currentPage * itemsPerPage + 1}-${Math.min((currentPage + 1) * itemsPerPage, transactions.length)} of ${transactions.length}`}
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
              cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed',
              background: currentPage < totalPages - 1 ? 'none' : '#f2f2f2',
              borderRadius: '6px',
              "&:hover": { background: currentPage < totalPages - 1 ? '#F2F4F4' : 'none' },
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
