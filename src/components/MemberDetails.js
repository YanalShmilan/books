import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import {
  returnBook,
  borrowBook,
  editMemberAction,
  deleteMember,
} from '../store/actions';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import BookItem from './BookItem';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

const MemberDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { slug } = useParams();
  let members = useSelector((state) => state.members);
  let books = useSelector((state) => state.books);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let memberDetail = members.find((member) => member.slug === slug);
  if (memberDetail === undefined) {
    memberDetail = {
      id: '',
      firstName: '',
      lastName: '',
      slug: '',
      currentlyBorrowedBooks: '',
      membership: '',
      img: '',
    };
  }
  const [editMember, setEditMember] = useState({
    id: memberDetail.id,
    firstName: memberDetail.firstName,
    lastName: memberDetail.lastName,
    slug: memberDetail.slug,
    currentlyBorrowedBooks: memberDetail.currentlyBorrowedBooks,
    membership: memberDetail.membership,
    img: memberDetail.img,
  });
  if (editMember.id === '') {
    return <Redirect to="/404" />;
  }
  let imgClass = '';
  if (memberDetail.membership === 'silver') {
    imgClass = 'img-silver';
  } else if (memberDetail.membership === 'gold') {
    imgClass = 'img-gold';
  } else if (memberDetail.membership === 'platinum') {
    imgClass = 'img-platinum';
  }
  let borrowdBooks = memberDetail.currentlyBorrowedBooks
    .map((bookId) => {
      if (books.find((book) => book.id === bookId)) {
        return books.find((book) => book.id === bookId);
      }
    })
    .map((book) => (
      <div className="book-item">
        <BookItem book={book} />
        <button
          className="btn-btee5"
          onClick={() => dispatch(returnBook(book.id))}
        >
          return book
        </button>
      </div>
    ));
  const handleChange = (event) => {
    setEditMember({ ...editMember, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editMemberAction(editMember));
    history.push(`/members/${editMember.slug}`);
    handleClose();
  };
  return (
    <div>
      <Helmet>
        <title>{`${memberDetail.firstName} ${memberDetail.lastName}`}</title>
      </Helmet>
      <center>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" className={imgClass} src={memberDetail.img} />
          <Card.Body>
            <Card.Title>{`${memberDetail.firstName} ${memberDetail.lastName}`}</Card.Title>
            <Card.Text>Membership: {memberDetail.membership}</Card.Text>
            <button onClick={() => handleShow()} className="btn-btee5">
              Edit member
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to delete this Member?')
                ) {
                  dispatch(deleteMember(editMember.id));
                  history.push('/members');
                }
              }}
              className="btn-btee5-red"
            >
              Delete member
            </button>
          </Card.Body>
        </Card>
        {borrowdBooks.length > 0 ? (
          <center>
            Books currently borrowed by {memberDetail.firstName} :
            <div className="book-list">{borrowdBooks}</div>
          </center>
        ) : (
          <center>This member borrowed no books</center>
        )}
        <button className="btn-btee5" onClick={() => history.goBack()}>
          Go back
        </button>
      </center>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>First name: </Form.Label>
            <Form.Control
              value={editMember.firstName}
              name="firstName"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>last name: </Form.Label>
            <Form.Control
              value={editMember.lastName}
              name="lastName"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>Membership: </Form.Label>
            <Form.Control
              value={editMember.membership}
              as="select"
              name="membership"
              onChange={handleChange}
            >
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="platinum">Platinum</option>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn-btee5" type="onSubmit" onClick={handleSubmit}>
            Edit member
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default MemberDetails;
