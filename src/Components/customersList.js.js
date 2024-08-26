import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des clients:",
          error.response?.data || error.message
        );
      }
    };

    fetchCustomers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  const handleUpdate = (customerId) => {
    console.log("Mise à jour du client avec l'ID :", customerId);
    navigate(`/update-customer/${customerId}`);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client?")) {
      try {
        await axios.delete(`http://localhost:8000/api/customers/${customerId}`);
        setCustomers(
          customers.filter((customer) => customer.id !== customerId)
        );
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du client:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleClick = () => {
    navigate("/form");
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <Paper
      style={{
        marginTop: "20px",
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: "16px", fontWeight: "bold" }}
      >
        Liste des Clients
      </Typography>
      {/* Create Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ padding: "6px 12px", fontSize: "14px", marginBottom: "16px" }}
      >
        Create
      </Button>

      {/* Search Bar */}
      <TextField
        label="Rechercher par nom"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          marginBottom: "16px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        }}
      />
      <TableContainer>
        <Table
          style={{
            minWidth: 650,
            backgroundColor: "#fafafa",
            borderRadius: "8px",
          }}
          sx={{
            "& .MuiTableCell-root": {
              padding: "10px",
              fontSize: "14px",
              backgroundColor: "#e0e0e0",
              fontWeight: "600",
              borderBottom: "2px solid #ddd",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                ID
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Email
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Num_Téléphone
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Etat
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f7f7f7" } }}
                >
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.Num_Téléphone}</TableCell>
                  <TableCell>{customer.Etat}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(customer.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredCustomers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Clients par page"
        sx={{
          "& .MuiTablePagination-toolbar": {
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      />
    </Paper>
  );
};

export default CustomersList;
