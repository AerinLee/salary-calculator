import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Salary } from "../model/SalaryModel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton } from "@mui/material";

export interface SalaryTableProps {
  salaryList: Salary[];
  deleteItem: Function;
}

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SalaryTable = ({ salaryList, deleteItem }: SalaryTableProps) => {
  return (
    <TableContainer component={Box} sx={{ maxWidth: 720, marginTop: "3rem" }}>
      <Table sx={{ maxWidth: 720 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="5%"></TableCell>
            <TableCell align="center" width="30%">
              일시
            </TableCell>
            <TableCell align="center" width="30%">
              금액
            </TableCell>
            <TableCell align="center" width="25%">
              인상률
            </TableCell>
            <TableCell align="center" width="10%">
              삭제
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryList.length > 0 &&
            salaryList.map((row, idx) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" width="5%">
                  {idx + 1}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  width="30%"
                >
                  {row.date}
                </TableCell>
                <TableCell align="center" width="30%">
                  {numberWithCommas(row.amount)}원
                </TableCell>
                <TableCell align="center" width="25%">
                  {row.riseRate?.toFixed(2) ?? "-"}%
                </TableCell>
                <TableCell align="center" width="10%">
                  <div onClick={() => deleteItem(row.id)}>
                    <IconButton aria-label="delete">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {salaryList.length == 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                값이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalaryTable;
