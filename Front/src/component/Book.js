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

export const Books = () => {
  const [book_id, setBook] = useState("");
  const [author_id, setAuthor] = useState("");
  const [publisher_id, setPublisherID] = useState("");
  const [title, setTitle] = useState("");
  const [place_publication, setPublication] = useState("");
  const [category_id, setCategory] = useState("");
  const [published_dt, setPublisherDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [array, setArray] = useState("");
  const url = "http://localhost:3000/books/";

  useEffect(() => {
    getAllBook();
  }, []);
  const addBook = async () => {
    let headers = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_id: author_id,
        publisher_id: publisher_id,
        title: title,
        place_publication: place_publication,
        category_id: category_id,
        published_dt: published_dt,
        isbn: isbn,
        status: true,
      }),
    };

    await fetch(url, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBook();
  };

  const updateBook = async () => {
    let headers = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: book_id,
        author_id: author_id.length > 0 ? author_id : null,
        publisher_id: publisher_id.length > 0 ? publisher_id : null,
        title: title.length > 0 ? title : null,
        place_publication:
          place_publication.length > 0 ? place_publication : null,
        category_id: category_id.length > 0 ? category_id : null,
        published_dt: published_dt.length > 0 ? published_dt : null,
        isbn: isbn.length > 0 ? isbn : null,
        status: 0,
      }),
    };
    await fetch(url, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBook();
  };

  const deleteBook = async () => {
    let headers = {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };
    let idtodelete = book_id;

    await fetch("http://localhost:3000/books?book_id=" + idtodelete, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBook();
  };
  const getAllBook = async () => {
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
            Ajouter Livre
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            <br></br>
            <label>
              <TextField
                id="outlined-basic"
                label="Auteur ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setAuthor(
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
                label="Publication"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setPublisherID(
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
                label="Titre"
                variant="outlined"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Place de publication"
                variant="outlined"
                onChange={(event) => setPublication(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Categorie ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setCategory(
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
                label="Publication date"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setPublisherDate(
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
                label="ISBN"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setIsbn(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  )
                }
              />
            </label>
            <br></br>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={addBook}>
            Envoyer
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="span">
            Modifier Livre
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            <br></br>
            <label>
              <TextField
                id="outlined-basic"
                label="Livre ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setBook(
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
                label="Auteur ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setAuthor(
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
                label="Publication"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setPublisherID(
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
                label="Titre"
                variant="outlined"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Place de publication"
                variant="outlined"
                onChange={(event) => setPublication(event.target.value)}
              />
            </label>
            <label>
              <TextField
                id="outlined-basic"
                label="Categorie ID"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setCategory(
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
                label="Publication date"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setPublisherDate(
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
                label="ISBN"
                variant="outlined"
                type="number"
                min="0"
                onChange={(event) =>
                  setIsbn(
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  )
                }
              />
            </label>
            <br></br>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={updateBook}>
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
                  setBook(
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
          <Button variant="contained" onClick={deleteBook}>
            Supprimer
          </Button>
        </CardActions>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Auteur</TableCell>
              <TableCell align="right">Publicateur</TableCell>
              <TableCell align="right">Titre</TableCell>
              <TableCell align="right">Lieu de publication</TableCell>
              <TableCell align="right">Categorie</TableCell>
              <TableCell align="right">Publication date</TableCell>
              <TableCell align="right">isbn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array &&
              array.map((row) => (
                <TableRow
                  key={row.book_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.book_id}
                  </TableCell>
                  <TableCell align="right">{row.author_id}</TableCell>
                  <TableCell align="right">{row.publisher_id}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.place_publication}</TableCell>
                  <TableCell align="right">{row.category_id}</TableCell>
                  <TableCell align="right">{row.published_dt}</TableCell>
                  <TableCell align="right">{row.isbn}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
