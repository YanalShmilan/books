import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addBook } from '../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import { Modal, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const BooksList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let books = useSelector((state) => state.books);
  const [book, setBook] = useState({
    author: '',
    title: '',
    genre: [],
    borrowedBy: [],
    available: true,
  });
  const [query, setQuery] = useState('');

  books = books.map((book) => {
    if (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.genre.toString().toLowerCase().includes(query.toLowerCase())
    ) {
      return (
        <div className="book-item">
          <BookItem book={book} />
        </div>
      );
    }
  });
  const handleChange = (event) => {
    if (event.target.name === 'genre') {
      let books = event.target.value;
      books = books.split(',');
      setBook({ ...book, [event.target.name]: books });
    } else {
      setBook({ ...book, [event.target.name]: event.target.value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBook(book));
    setBook({
      author: '',
      title: '',
      genre: [],
      borrowedBy: [],
      available: true,
    });
    handleClose();
  };

  return (
    <div>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <center>
        <input
          class="form-control mr-sm-2"
          aria-label="Search"
          name="query"
          placeholder="search"
          type="search"
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </center>
      <button
        // style={{ margin: '15px', backgroundColor: '#cc9b6d', border: '0px' }}
        className="btn-btee5"
        onClick={handleShow}
      >
        Add a new book
      </button>
      <div className="book-list">{books}</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Title: </Form.Label>
            <Form.Control
              value={book.title}
              name="title"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>Author: </Form.Label>
            <Form.Control
              value={book.author}
              name="author"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>Genre: </Form.Label>
            <Form.Control
              value={book.genre}
              name="genre"
              onChange={handleChange}
            ></Form.Control>
            <Form.Text className="text-muted">
              sepreate genres by a comma.
            </Form.Text>
            <Form.Label>Img: </Form.Label>
            <Form.Control
              value={book.img}
              name="img"
              onChange={handleChange}
            ></Form.Control>
            Available{' '}
            <Form.Control as="select" onChange={handleChange}>
              <option selected style={{ fontFamily: 'sans-serif' }}>
                Choose...
              </option>
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </Form.Control>
          </Form>{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn-btee5" type="onSubmit" onClick={handleSubmit}>
            Add book
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default BooksList;
