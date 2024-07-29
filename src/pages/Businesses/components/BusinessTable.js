import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { BusinessMenuOption } from "./BusinessMenuOption";
import { useGETBusinesses } from "api/business";

const itemPerPage = 5;

function data(id, name, category, email, createdOn, iconLink) {
  return {
    id,
    name,
    category,
    email,
    createdOn,
    iconLink,
  };
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "BUSINESS NAME",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: " BUSINESS CATEGORY",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "BUSINESS EMAIL",
  },
  {
    id: "Dates",
    numeric: true,
    disablePadding: false,
    label: "DATES ADDED",
  },
  {
    id: "iconLink",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function BusinessTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel>
              <Typography variant="h4">{headCell.label}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const numberOfPage = Math.ceil(data.length / itemPerPage)
const pageIndex = Array.from({length : numberOfPage}, (_, idx) => idx+1)


export function BusinessTable(props) {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError } = useGETBusinesses();
  const businesses = data?.data?.businesses || [];
  console.log(data);
  const { onSelectBusiness } = props;

  const [selected, setSelected] = React.useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
 

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = businesses.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Box sx={{ width: "95%", marginTop: "50px" }}>
      <Box sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <BusinessTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {businesses.map((row, index) => {
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
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Typography variant="h5">{row.name}</Typography>
                    </TableCell>
                    <TableCell align="right" id={labelId} component="th">
                      <Typography variant="h5">{row.category}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">{row.address}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">{row.createdOn}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <BusinessMenuOption
                        business={row}
                        onSelectBusiness={onSelectBusiness}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>
            
          </Table>
          <div className="space-x-2">
          {businesses.map((row) => (
            <rows key={row.name} row={row} />
          ))}
            <Box sx={{display:'flex', gap:'50px'}}>
            <Box sx={{width:'270%', display:'flex', justifyContent:'space-between',
        alignItems:'center', marginLeft:'50px', padding:'20px 0'}}>
        <Typography variant='h5'>
          {' '}
            {currentPage + 1}-{itemPerPage} of {businesses.length}
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
