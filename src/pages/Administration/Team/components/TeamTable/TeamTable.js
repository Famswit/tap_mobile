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
function data(fullname, email, roles, status) {
  return {
    fullname,
    email,
    roles,
    status,
  };
}

function Row(props) {
  const { row, handleOpenMoreDetails } = props;

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell
        sx={{
          width: "400px",
          color: `${row.fullname === "invite sent" ? "#25B883" : "#000"}`,
          paddingLeft: "50px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: "150px",
            background: `${
              row.fullname === "invite sent" ? "#E9F8F3" : "none"
            }`,
            textAlign: "center",
            borderRadius: "22px",
            padding: "4px 0",
            marginLeft:'-30px'
          }}
        >
          {row.fullname}
        </Typography>
      </TableCell>

      <TableCell>{row.email}</TableCell>

      <TableCell sx={{ textAlign: "start", width: "200px" }}>
        {row.roles}
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box marginTop={1.5}>
            {row.status == "Resend invite" ? <ReloadIcon /> : ""}
          </Box>

          <Typography variant="h5">{row.status}</Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <AdminDetailsMenu handleOpenMoreDetails={handleOpenMoreDetails} />
        </Box>
      </TableCell>
    </TableRow>
  );
}


const numberOfPage = Math.ceil(data.length / itemPerPage);
const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

export default function AdminTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTeamMate, setSelectedTeamMate] = useState(null);

  const { data, isLoading, isError } = useGetTeams();
  const teams = data?.data?.teams || [];
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const row = data.data.teams.slice(
    currentPage * itemPerPage,
    currentPage + 1 * itemPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SummaryDetails
        open={Boolean(selectedTeamMate)}
        teamMate={selectedTeamMate}
        handleClose={() => setSelectedTeamMate(null)}
      />
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingLeft: "50px" }}>Fullname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((row) => (
              <Row
                key={row.name}
                row={row}
                handleOpenMoreDetails={() => setSelectedTeamMate(row)}
              />
            ))}

            <Box
              sx={{
                width: "270%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "50px",
                padding: "20px 0",
              }}
            >
              <Typography variant="h5">
                {" "}
                {currentPage + 1}-{itemPerPage} of {data?.data.teams.length}{" "}
              </Typography>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  variant="h5"
                  sx={{
                    padding: " 8px 20px",
                    cursor: "pointer",
                    "&:hover": {
                      background: "var(--Neutral-Divider, #F2F4F4)",
                      borderRadius: "6px",
                    },
                  }}
                  disabled={currentPage < 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </Typography>

                {pageIndex
                  .slice(
                    Math.max(0, currentPage - 2),
                    Math.min(numberOfPage, currentPage + 1)
                  )
                  .map((page) => (
                    <Typography
                      variant="h4"
                      sx={{
                        background: "var(--Neutral-Divider, #F2F4F4)",
                        borderRadius: "6px",
                        padding: " 8px 20px",
                        cursor: "pointer",
                        "&:hover": {
                          background: "var(--Neutral-Divider, #F2F4F4)",
                        },
                      }}
                      key={page}
                      onClick={() => handlePageChange(page - 1)}
                      className={page === currentPage + 1 ? "active" : ""}
                    >
                      Page {page}
                    </Typography>
                  ))}

                <Typography
                  variant="h5"
                  sx={{
                    padding: " 8px 20px",
                    cursor: "pointer",
                    "&:hover": {
                      background: "var(--Neutral-Divider, #F2F4F4)",
                      borderRadius: "6px",
                    },
                  }}
                  disabled={currentPage > numberOfPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Typography>
              </Box>
            </Box>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
