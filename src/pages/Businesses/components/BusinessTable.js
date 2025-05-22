import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { BusinessMenuOption } from "./BusinessMenuOption";
import { useGETBusinesses } from "api/business";
import CircularProgress from '@mui/material/CircularProgress';


const itemsPerPage = 5;

export function BusinessTable({ businesses = [], onGenerateApiKey }) {
  // const {data, isLoading, isError} = useGETBusinesses();
  // const businesses = data?.data?.businesses || [];
  // console.log(data);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500); // simulate short loading
    return () => clearTimeout(timeout);
  }, []);
  
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentData = businesses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', marginLeft:"-200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"><Checkbox /></TableCell>
              <TableCell>BUSINESS NAME</TableCell>
              <TableCell align="right">BUSINESS CATEGORY</TableCell>
              <TableCell align="right">BUSINESS EMAIL</TableCell>
              <TableCell align="right">DATE ADDED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox"><Checkbox /></TableCell>
                <TableCell>{row.businessName}</TableCell>
                <TableCell align="right">{row.businessCategory}</TableCell>
                <TableCell align="right">{row.businessEmail}</TableCell>
                <TableCell align="right">{row.dateAdded}</TableCell>
                <TableCell align="right">
                  <BusinessMenuOption business={row} 
                  onGenerateApiKey={onGenerateApiKey}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
        <Typography variant="h5">
          {`${currentPage * itemsPerPage + 1}-${Math.min((currentPage + 1) * itemsPerPage, businesses.length)} of ${businesses.length}`}
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              cursor: currentPage > 0 ? "pointer" : "not-allowed",
              background: currentPage > 0 ? "none" : "#f2f2f2",
              borderRadius: "6px",
            }}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Typography>
          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              cursor: currentPage < totalPages - 1 ? "pointer" : "not-allowed",
              background: currentPage < totalPages - 1 ? "none" : "#f2f2f2",
              borderRadius: "6px",
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
