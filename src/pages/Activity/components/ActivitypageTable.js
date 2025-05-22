import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

const itemPerPage = 5;

const headCells = [
  { id: "name", label: "NAME" },
  { id: "description", label: "ACTION DETAILS" },
  { id: "createdOn", label: "DATE & TIME" },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left">
            <Typography variant="h6">{headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ActivityTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setActivityLogs(
        Array.from({ length: 24 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          description: `Performed action #${i + 1}`,
          createdOn: new Date(Date.now() - i * 3600000).toISOString(),
        }))
      );
      setIsLoading(false);
    }, 1500);
  }, []);

  const numberOfPages = Math.ceil(activityLogs.length / itemPerPage);
  const paginatedLogs = activityLogs.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer>
        <Table>
          <EnhancedTableHead />
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>
                  <Typography variant="h6">{log.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{log.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{new Date(log.createdOn).toLocaleString()}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          paddingBottom: "100px",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          marginRight: "30px",
        }}
      >
        <Typography variant="h5">
          {`${currentPage * itemPerPage + 1}-${Math.min(
            (currentPage + 1) * itemPerPage,
            activityLogs.length
          )} of ${activityLogs.length}`}
        </Typography>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              cursor: currentPage > 0 ? "pointer" : "not-allowed",
              background: currentPage > 0 ? "none" : "#f2f2f2",
              borderRadius: "6px",
              "&:hover": { background: currentPage > 0 ? "#F2F4F4" : "none" },
            }}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Typography>

          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              background: "#E0E0E0",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Page {currentPage + 1}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              cursor: currentPage < numberOfPages - 1 ? "pointer" : "not-allowed",
              background: currentPage < numberOfPages - 1 ? "none" : "#f2f2f2",
              borderRadius: "6px",
              "&:hover": { background: currentPage < numberOfPages - 1 ? "#F2F4F4" : "none" },
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