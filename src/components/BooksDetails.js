import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  returnBook,
  borrowBook,
  editBookAction,
  deleteBook,
} from '../store/actions';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Form, Button } from 'react-bootstrap';

import MemberItem from './MemberItem';

const BooksDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [query, setQuery] = useState('');
  const { slug } = useParams();
  let members = useSelector((state) => state.members);
  let books = useSelector((state) => state.books);

  let bookToFind = books.find((book) => book.slug === slug);
  const [book, setBook] = useState({
    id: bookToFind.id,
    author: bookToFind.author,
    title: bookToFind.title,
    genre: bookToFind.genre,
    slug: bookToFind.slug,
    borrowedBy: bookToFind.borrowedBy,
    available: bookToFind.available,
    img: bookToFind.img,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editBookAction(book));
    history.push(`/books/${book.slug}`);
    handleClose();
  };
  let borrowedMembers = bookToFind.borrowedBy.map((bookId) => {
    if (members.find((member) => member.id === bookId)) {
      return members.find((member) => member.id === bookId);
    }
  });
  let mem = borrowedMembers[borrowedMembers.length - 1];

  if (borrowedMembers) {
    borrowedMembers = borrowedMembers.map((member) => (
      <div>
        <Link
          to={`/members/${member.slug}`}
        >{`${member.firstName} ${member.lastName}`}</Link>
      </div>
    ));
  }

  let eligibleMembers = members
    .filter((member) => {
      if (
        member.membership === 'silver' &&
        member.currentlyBorrowedBooks.length < 2
      ) {
        return member;
      } else if (
        member.membership === 'gold' &&
        member.currentlyBorrowedBooks.length < 3
      ) {
        return member;
      } else if (
        member.membership === 'platinum' &&
        member.currentlyBorrowedBooks.length < 5
      ) {
        return member;
      } else {
      }
    })
    .filter((member) =>
      member.firstName.toLowerCase().includes(query.toLowerCase())
    )
    .map((member) => (
      <div className="member-item">
        <MemberItem member={member} width="10rem" className="card" />

        <button
          className="btn-btee5"
          onClick={() => {
            if (member.firstName == 'Laila') {
              if (
                window.confirm(
                  'Laila never reads her books, are you sure you want to borrow her?'
                )
              ) {
                dispatch(borrowBook(bookToFind.id, member.id));
              }
            } else {
              dispatch(borrowBook(bookToFind.id, member.id));
            }
          }}
        >
          Borrow
        </button>
      </div>
    ));

  const setView = () => {
    if (!bookToFind.available) {
      return (
        <p>
          The book is currently borrowed by :
          <MemberItem width="10rem" member={mem} />
          <button
            className="btn-btee5"
            onClick={() => dispatch(returnBook(bookToFind.id))}
          >
            Return book
          </button>
        </p>
      );
    } else {
      return (
        <center>
          <input
            className="search-spec"
            aria-label="Search"
            name="query"
            placeholder="search"
            type="search"
            onChange={(event) => setQuery(event.target.value)}
          ></input>
          <br />
          <span>
            Eligible members:{' '}
            <div className="members-list"> {eligibleMembers}</div>
          </span>
        </center>
      );
    }
  };
  return (
    <center>
      <Helmet>
        <title>{bookToFind.title}</title>
      </Helmet>
      <div className="book-detail">
        <figure class="book">
          <ul class="hardcover_front">
            <li>
              <img src={bookToFind.img} alt="" width="100%" height="100%" />
            </li>
            <li></li>
          </ul>

          <ul class="page">
            <li></li>
            <li>
              <a className="btn" href="">
                {bookToFind.available ? (
                  <span style={{ color: 'green' }}>available</span>
                ) : (
                  <span style={{ color: 'red' }}>Not available</span>
                )}
              </a>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <ul class="hardcover_back">
            <li></li>
            <li></li>
          </ul>
          <ul class="book_spine">
            <li></li>
            <li></li>
          </ul>
          <figcaption>
            <h1>{bookToFind.title}</h1>
            <span>By {bookToFind.author}</span>
            <span>Genre: {bookToFind.genre.toString().split(' ')}</span>
            <p>
              Status:{' '}
              {bookToFind.available ? (
                <span style={{ color: 'green' }}>available</span>
              ) : (
                <span style={{ color: 'red' }}>Not available</span>
              )}
            </p>
            <span>Borrowed Before By: {borrowedMembers}</span>
            <span className="cont"></span>
            <br />
            <button
              className="btn-btee5-red"
              type="onSubmit"
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to delete this Book?')
                ) {
                  dispatch(deleteBook(book.id));
                  history.push('/books');
                }
              }}
            >
              Delete book
            </button>
            <button className="btn-btee5" onClick={() => handleShow()}>
              Edit Book
            </button>

            <button className="btn-btee5" onClick={() => history.goBack()}>
              Go Back
            </button>
          </figcaption>
        </figure>

        <center>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Container className="borrowd" fluid>
            {setView()}
          </Container>
        </center>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {bookToFind.title}</Modal.Title>
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
          </Form>{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn-btee5" type="onSubmit" onClick={handleSubmit}>
            Edit book
          </button>
        </Modal.Footer>
      </Modal>
    </center>
  );
};

export default BooksDetails;
