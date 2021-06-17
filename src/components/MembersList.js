import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addMember } from '../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MemberItem from './MemberItem';
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const MembersList = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    currentlyBorrowedBooks: [],
    membership: 'gold',
  });
  let members = useSelector((state) => state.members);
  members = members.map((member) => {
    if (
      member.firstName.toLowerCase().includes(query.toLowerCase()) ||
      member.membership
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      member.lastName.toLowerCase().includes(query.toLowerCase())
    ) {
      return (
        <Col xs>
          <MemberItem width="18rem" className="card" member={member} />
        </Col>
      );
    }
  });
  const handleChange = (event) => {
    setMember({ ...member, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addMember(member));
    setMember({
      firstName: '',
      lastName: '',
      currentlyBorrowedBooks: [],
      membership: 'gold',
    });
    handleClose();
  };

  return (
    <div>
      <Helmet>
        <title>Members</title>
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
      <button className="btn-btee5" onClick={handleShow}>
        Add a new member
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>First name: </Form.Label>
            <Form.Control
              value={member.firstName}
              name="firstName"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>last name: </Form.Label>
            <Form.Control
              value={member.lastName}
              name="lastName"
              onChange={handleChange}
            ></Form.Control>
            <Form.Label>Membership: </Form.Label>
            <Form.Control as="select" name="membership" onChange={handleChange}>
              <option selected style={{ fontFamily: 'sans-serif' }}>
                Choose...
              </option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="platinum">Platinum</option>
            </Form.Control>
            <Form.Label>Gender: </Form.Label>
            <Form.Control as="select" name="gender" onChange={handleChange}>
              <option selected style={{ fontFamily: 'sans-serif' }}>
                Choose...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn-btee5" type="onSubmit" onClick={handleSubmit}>
            Add member
          </button>
        </Modal.Footer>
      </Modal>
      <Container fluid="md">
        <Row>{members}</Row>
      </Container>
    </div>
  );
};
export default MembersList;
