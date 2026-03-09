const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let books = [];

//Returns student number

app.get("/whoami", (req, res) => {
    res.status(200).json({
        studentNumber: "2709365"
    });
});


//Returns all books

app.get("/books", (req, res) => {
    res.status(200).json(books);
});

//Returns a specific book

app.get("/books/:id", (req, res) => {

    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    res.status(200).json(book);
});

//Create a new book

app.post("/books", (req, res) => {

    const { id, title, details } = req.body;

    if (!id || !title) {
        return res.status(400).json({
            error: "Missing required fields"
        });
    }

    const newBook = {
        id,
        title,
        details: details || []
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

//Update a book

app.put("/books/:id", (req, res) => {

    const book = books.find(parseInt(b => b.id) ===parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    const { title } = req.body;

    if (title) {
        book.title = title;
    }

    res.status(200).json(book);
});

//Delete a book

app.delete("/books/:id", (req, res) => {

    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted"
    });
});

//Add detail to a book

app.post("/books/:id/details", (req, res) => {

    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    const { id, author, genre, publicationYear } = req.body;

    const newDetail = {
        id,
        author,
        genre,
        publicationYear
    };

    book.details.push(newDetail);

    res.status(201).json(book);
});

//Remove detail from book

app.delete("/books/:id/details/:detailId", (req, res) => {

    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: "Book or detail not found"
        });
    }

    const detailIndex = book.details.findIndex(
        d => d.id === req.params.detailId
    );

    if (detailIndex === -1) {
        return res.status(404).json({
            error: "Book or detail not found"
        });
    }

    book.details.splice(detailIndex, 1);

    res.status(200).json({
        message: "Detail deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});