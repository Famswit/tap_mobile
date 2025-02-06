import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

const itemsPerPage = 5;

// Function to generate fake business transaction data
const generateFakeTransactionData = () => {
  const statuses = ["successful", "pending", "failed"];
  const descriptions = ["Payment", "Refund", "Withdrawal", "Deposit"];

  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    date: new Date(
      Date.now() - Math.random() * 10000000000
    ).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    details: [
      {
        reference: `#REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        bankName: "Zenith Bank",
        mode: "Bank Transfer",
        bankNo: `00${Math.floor(Math.random() * 1000000000)}`,
        accountName: `Account ${index + 1}`,
      },
    ],
  }));
};

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell width={100} sx={{ paddingLeft: "50px" }}>{row.description}</TableCell>
        <TableCell width={200} align="right">{row.amount}</TableCell>
        <TableCell width={200} align="right">{row.date}</TableCell>
        <TableCell width={200}
          sx={{ color: row.status === "failed" ? "red" : "#25B883" }}
        >
          <Typography
            sx={{
              background: row.status === "failed" ? "#FEEFF0" : "#E9F8F3",
              padding: "4px 16px",
              borderRadius: "22px",
              textAlign: 'center'
            }}
          >
            {row.status}
          </Typography>
        </TableCell>
        <TableCell width={150}>
          <Box onClick={() => setOpen(!open)} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Typography>{open ? "Collapse" : "View Details"}</Typography>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>REFERENCE NUMBER</TableCell>
                    <TableCell align="right">BANK NUMBER</TableCell>
                    <TableCell align="right">PAYMENT MODE</TableCell>
                    <TableCell align="right">BANK ACCOUNT NO</TableCell>
                    <TableCell align="right">ACCOUNT NAME</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detail) => (
                    <TableRow key={detail.reference} >
                      <TableCell>{detail.reference}</TableCell>
                      <TableCell align="right">{detail.bankName}</TableCell>
                      <TableCell align="right">{detail.mode}</TableCell>
                      <TableCell align="right">{detail.bankNo}</TableCell>
                      <TableCell align="right">{detail.accountName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    description: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        reference: PropTypes.string.isRequired,
        bankName: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired,
        bankNo: PropTypes.string.isRequired,
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function BusinessTransactionTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const transactionData = generateFakeTransactionData();

  const totalPages = Math.ceil(transactionData.length / itemsPerPage);
  const currentData = transactionData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const visiblePages = Array.from(
    { length: Math.min(3, totalPages) }, // Show up to 3 pages
    (_, idx) => Math.max(Math.min(currentPage - 1 + idx, totalPages - 3), 0) + idx
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
  };

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: "50px" }}>DESCRIPTION</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
            <TableCell align="right">DATE & TIME</TableCell>
            <TableCell align="right">STATUS</TableCell>
            <TableCell align="center">DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', paddingBottom:'100px', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginRight:'30px' }}>
      <Typography variant="h5">
        {`${currentPage * itemsPerPage + 1}-${Math.min((currentPage + 1) * itemsPerPage, transactionData.length)} of ${transactionData.length}`}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        
        {/* Prev Button */}
        <Typography
          variant="h5"
          sx={{
            padding: '8px 20px',
            cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
            background: currentPage > 0 ? 'none' : '#f2f2f2',
            borderRadius: '6px',
            "&:hover": { background: currentPage > 0 ? '#F2F4F4' : 'none' }
          }}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Typography>
    
        {/* Active Page Number */}
        <Typography
          variant="h5"
          sx={{
            padding: '8px 20px',
            background: '#E0E0E0',
            borderRadius: '6px',
            fontWeight: 'bold',
          }}
        >
          Page {currentPage + 1}
        </Typography>
    
        {/* Next Button */}
        <Typography
          variant="h5"
          sx={{
            padding: '8px 20px',
            cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed',
            background: currentPage < totalPages - 1 ? 'none' : '#f2f2f2',
            borderRadius: '6px',
            "&:hover": { background: currentPage < totalPages - 1 ? '#F2F4F4' : 'none' }
          }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Typography>
      </Box>
    </Box>
    
    </TableContainer>
  );
}
