import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const Author = () => {
  const [username, setUsername] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");
  const [id, setId] = useState("");
  const [array, setArray] = useState();
  const url = "http://localhost:3000/authors/";

  useEffect(() => {
    getAllAuthor();
  }, []);

  const addAuthor = async () => {
    let headers = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_name: username,
        born: born,
        died: died,
      }),
    };

    await fetch(url, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllAuthor();
  };

  const updateAuthor = async () => {
    let headers = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_id: id,
        author_name: username.length > 0 ? username : null,
        born: born.length > 0 ? born : null,
        died: died.length > 0 ? died : null,
      }),
    };

    await fetch(url, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllAuthor();
  };

  const deleteAuthor = async () => {
    let headers = {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };
    let idtodelete = id;

    await fetch("http://localhost:3000/authors?id=" + idtodelete, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllAuthor();
  };

  const getAllAuthor = async () => {
    let headers = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url + "all", headers);
    const responseArray = await response.json();
    setArray(responseArray);
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="span">
            Ajouter auteur
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            <br></br>
            <label>
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Naissance"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setBorn(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  )
                }
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Mort"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) => {
                  setDied(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  );
                }}
              />
            </label>
            <br></br>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={addAuthor}>
            Envoyer
          </Button>
        </CardActions>
      </Card>
      <br></br>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="span">
            Modifier auteur
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            <br></br>
            <label>
              <TextField
                id="outlined-basic"
                label="ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setId(
                    event.target.value < 1
                      ? (event.target.value = 1)
                      : event.target.value
                  )
                }
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Naissance"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setBorn(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  )
                }
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Mort"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) => {
                  setDied(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  );
                }}
              />
            </label>
            <br></br>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={updateAuthor}>
            Modifier
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography component="span" variant="h5" component="span">
            Supprimer
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            <br></br>
            <label>
              <TextField
                id="outlined-basic"
                label="ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setId(
                    event.target.value < 1
                      ? (event.target.value = 1)
                      : event.target.value
                  )
                }
              />
            </label>

            <br></br>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={deleteAuthor}>
            Supprimer
          </Button>
        </CardActions>
      </Card>

      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nom</TableCell>
              <TableCell align="right">Née</TableCell>
              <TableCell align="right">Mort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array &&
              array.map((row) => (
                <TableRow
                  key={row.author_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.author_id}
                  </TableCell>
                  <TableCell align="right">{row.author_name}</TableCell>
                  <TableCell align="right">{row.born}</TableCell>
                  <TableCell align="right">
                    {row.died ? row.died : "Pas mort"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
