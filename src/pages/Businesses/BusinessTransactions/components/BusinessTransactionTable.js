import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useGetBusinessTransaction } from "api/business";

const itemPerPage = 5;

function data(description, amount, date, status) {
  return {
    description,
    amount,
    date,
    status,
    femi: [
      {
        reference: "#199-238-2943-1334",
        bankname: "Zenith bank",
        mode: "Bank transfer",
        bankno: "0012343565",
        accountname: "Josh Bamara",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell
          width={300}
          sx={{ paddingLeft: "50px", borderBottom: "none" }}
        >
          {row.description}
        </TableCell>
        <TableCell align="right" sx={{ borderBottom: "none" }}>
          {row.amount}
        </TableCell>
        <TableCell align="right" sx={{ borderBottom: "none" }}>
          {row.date}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            borderBottom: "none",
            color: `${row.status === "failed" ? "red" : "#25B883"}`,
          }}
        >
          <Typography
            variant=""
            sx={{
              background: `${row.status === "failed" ? "#FEEFF0" : "#E9F8F3"}`,
              padding: "4px 16px",
              textAlign: "center",
              borderRadius: "22px",
            }}
          >
            {row.status}
          </Typography>
        </TableCell>

        <TableCell
          sx={{ borderBottom: "none", borderTop: "1.6px solid #EBEEEF" }}
        >
          <Box
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5" color="#000" paddingLeft={5}>
                  Collapse
                </Typography>
                <KeyboardArrowUpIcon />
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5" color="#000" paddingLeft={5}>
                  View Details
                </Typography>
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
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ width: "97%", marginTop: "30px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        paddingLeft: "30px",
                        width: "400px",
                        color: "#7C7A78",
                      }}
                    >
                      REFERENCE NUMBER
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "none",
                        color: "#7C7A78",
                        paddingLeft: "-150px",
                      }}
                    >
                      BANK NUMBER
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "none", color: "#7C7A78" }}
                    >
                      PAYMENT MODE
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "none", color: "#7C7A78" }}
                    >
                      BANK ACCOUNT NO
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "none", color: "#7C7A78" }}
                    >
                      {" "}
                      ACCOUNT NAME
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.femi.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: "none", paddingLeft: "42px" }}
                      >
                        {historyRow.reference}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        {historyRow.bankname}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }} align="right">
                        {historyRow.mode}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }} align="right">
                        {historyRow.bankno}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }} align="right">
                        {historyRow.accountname}
                      </TableCell>
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
    amount: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    femi: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


const numberOfPage = Math.ceil(data.length / itemPerPage);
const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

export default function BusinessTransactionTable() {
  const [currentPage, setCurrentPage] = useState(0);
 

  const { data, isLoading, isError } = useGetBusinessTransaction();
  const businessTransaction = data?.data?.businessTransaction || [];
  console.log(data);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: "50px" }}>DESCRIPTION</TableCell>
            <TableCell align="right" sx={{ paddingLeft: "100px" }}>
              AMOUNT
            </TableCell>
            <TableCell align="right" sx={{ paddingLeft: "100px" }}>
              DATE & TIME
            </TableCell>
            <TableCell align="right" sx={{ paddingLeft: "100px" }}>
              STATUS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businessTransaction.map((row) => (
            <Row key={row.name} row={row} />
          ))}
          <Box
            sx={{
              width: "370%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "50px",
              padding: "20px 0",
            }}
          >
            <Typography variant="h5">
              {" "}
              {currentPage + 1}-{itemPerPage} of 10{" "}
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
                disabled={currentPage > numberOfPage}
                variant="h5"
                sx={{
                  padding: " 8px 20px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "var(--Neutral-Divider, #F2F4F4)",
                    borderRadius: "6px",
                  },
                }}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Typography>
            </Box>
          </Box>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
