import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { DataGrid } from "@mui/x-data-grid";


const Transactions = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {field: "Date", headerName: "Date"},
        {field: "Description", headerName: "Description", flex: 0.7},
        {field: "Category", headerName: "Category", headerAlign: "center", align: "center", flex: 0.5},
        {field: "Amount", headerName: "Amount", headerAlign: "center", align: "center", flex: 0.5, renderCell: ({ row: { Amount }}) => {
            let negative = Amount < 0 ? true : false
            return (
                <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" backgroundColor={
                    negative ? colors.redAccent[600] : colors.greenAccent[600]
                } fontWeight="600" fontStyle="bold" fontSize="14px" borderRadius="2px">
                    {`${negative ? '-' : '+'} $${toNumberWithCommas(Math.abs(Amount).toFixed(2))}`}
                </Box>
            )
        }},
        {field: "Running Balance", headerName: "Running Balance", headerAlign: "center", align: "center", flex: 0.5}
    ]

    const prepareData = () => {
        // Add an ID field to each transaction
        let transactions = props.transactions.toReversed().map((r, i) => ({ id: i + 1, ...r}))
        // Put dates in MM/DD/YYYY format
        transactions = transactions.map(r =>  ({ ...r, Date: formatDate(r['Date']) }))
        // Add amount column
        transactions.forEach(t => {
            t.Amount = 0
            if (t.Debits == "")
                t.Amount += Number(t.Income)
            else
                t.Amount -= Number(t.Debits)
        })
        // Delete income and debits column
        transactions = transactions.map(({ Income, Debits, ...rest }) => rest);
        // Monetize the running balance column
        transactions = transactions.map(r =>  ({ ...r, 'Running Balance': `$${toNumberWithCommas(Number(r['Running Balance']).toFixed(2))}`}))
        console.log(transactions);
        return transactions
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);

        return `${month}/${day}/${year}`;
    }

    const toNumberWithCommas = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    prepareData();

    return (
        <Box m="20px" className="table">
            <Box m="0px 0 0 0" height="80vh" sx={{
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700]
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "700",
                    fontStyle: "bold",
                    fontSize: "16px"
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: colors.blueAccent[700]
                },
                "& .MuiDataGrid-withBorderColor ": {
                    borderColor: colors.primary[500]
                },
                "& .MuiDataGrid-cellContent": {
                    fontWeight: "600",
                    fontStyle: "bold",
                    fontSize: "14px"
                },
                '& .MuiDataGrid-cell': {
                    backgroundColor: colors.primary[400],
                },
                "& ::-webkit-scrollbar": {
                    width: "6px"
                  },
                  "& ::-webkit-scrollbar-track": {
                    backgroundColor: colors.primary[400]
                  },
                  "& ::-webkit-scrollbar-thumb": {
                    borderRadius: "2px",
                    boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                    backgroundColor: colors.blueAccent[600]
                  }
            }}>
                <DataGrid className="table" rows={prepareData()} columns={columns}/>
            </Box>
        </Box>
    )
}

export default Transactions;