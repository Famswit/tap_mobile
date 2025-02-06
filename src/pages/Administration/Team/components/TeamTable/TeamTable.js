import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReloadIcon } from "assets/Icons/ReloadIcon";
import AdminDetailsMenu from "./components/AdminDetailsMenu";
import { SummaryDetails } from "../summaryDetails/SummaryDetails";
import { useGetTeams } from "api/teammates";

const itemPerPage = 5;

// Row Component
function Row({ row, onOpenDetails }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
        <Typography
          variant="h5"
          sx={{
            width: "150px",
            background: row.status === "Invite sent" ? "#E9F8F3" : "none",
            textAlign: "center",
            borderRadius: "22px",
            padding: "4px 0",
            color: row.status === "Invite sent" ? "#25B883" : "#000",
          }}
        >
          {row.fullname}
        </Typography>
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell sx={{ textAlign: "start", width: "200px" }}>{row.roles}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {row.status === "Resend invite" && <ReloadIcon />}
          <Typography variant="h5" sx={{ marginLeft: row.status === "Resend invite" ? 1 : 0 }}>
            {row.status}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <AdminDetailsMenu handleOpenMoreDetails={onOpenDetails} />
      </TableCell>
    </TableRow>
  );
}

// Main AdminTable Component
export default function AdminTable() {
  const { data } = useGetTeams();
  const teams = data?.data?.teams || [];
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTeamMate, setSelectedTeamMate] = useState(null);

  const totalPages = Math.ceil(teams.length / itemPerPage);
  const paginatedTeams = teams.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
  };

  const handleRoleChange = (updatedTeamMate) => {
    // Implement role change logic as per your requirements
    console.log("Role updated for:", updatedTeamMate);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SummaryDetails
        open={Boolean(selectedTeamMate)}
        teamMate={selectedTeamMate}
        handleClose={() => setSelectedTeamMate(null)}
        handleRoleChange={handleRoleChange}
      />

      <TableContainer component={Box}>
        <Table aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingLeft: "70px" }}>Fullname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTeams.map((row) => (
              <Row
                key={row.id}
                row={row}
                onOpenDetails={() => setSelectedTeamMate(row)}
              />
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
            teams.length
          )} of ${teams.length}`}
        </Typography>

        <Box sx={{ display: "flex", gap: "10px" }}>
          {/* Prev Button */}
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

          {/* Active Page Number */}
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

          {/* Next Button */}
          <Typography
            variant="h5"
            sx={{
              padding: "8px 20px",
              cursor: currentPage < totalPages - 1 ? "pointer" : "not-allowed",
              background: currentPage < totalPages - 1 ? "none" : "#f2f2f2",
              borderRadius: "6px",
              "&:hover": { background: currentPage < totalPages - 1 ? "#F2F4F4" : "none" },
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
