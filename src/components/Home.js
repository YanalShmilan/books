import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { VictoryPie } from 'victory-pie';
import { Card, CardGroup, CardDeck } from 'react-bootstrap';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import MemberItem from './MemberItem';

const Home = () => {
  const members = useSelector((state) => state.members);
  const books = useSelector((state) => state.books);
  const avBooks = books.filter((book) => book.available).length;
  const notAvBooks = books.filter((book) => !book.available).length;
  const goldMembers = members.filter(
    (member) => member.membership === 'gold'
  ).length;
  const silverMembers = members.filter(
    (member) => member.membership === 'silver'
  ).length;
  const platinumMembers = members.filter(
    (member) => member.membership === 'platinum'
  ).length;
  const myData = [
    { x: 'Silver', y: silverMembers },
    { x: 'Gold', y: goldMembers },
    { x: 'Platinum', y: platinumMembers },
  ];
  const booksAv = [
    { x: 'Available', y: avBooks },
    { x: 'Not available', y: notAvBooks },
  ];

  const [data, setData] = useState(myData);
  const [booksData, setBooksData] = useState(booksAv);

  let mostBorrowdBook;
  let i = 0;
  books.forEach((book) => {
    if (book.borrowedBy.length > i) {
      i = book.borrowedBy.length;
      mostBorrowdBook = book;
    }
  });
  const mostActiveMember = books.map((book) => book.borrowedBy);
  console.log('mapping', mostActiveMember);

  const mostActiveUserId = mostActiveMember
    .flat()
    .reduce(
      (a, b, i, arr) =>
        arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
          ? a
          : b,
      null
    );
  console.log('extracting id', mostActiveUserId);

  const mostActiveUserObj = members.find(
    (member) => member.id === mostActiveUserId
  );
  console.log('object', mostActiveUserObj);

  const occ = mostActiveMember
    .flat()
    .reduce((a, v) => (v === mostActiveUserObj.id ? a + 1 : a), 0);

  console.log('occ', occ);

  return (
    <center>
      <div className="chart">
        <Helmet>
          <title>Home</title>
        </Helmet>{' '}
        <CardDeck>
          <div className="chart-item">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Membership distribution</Card.Title>
                <VictoryPie
                  data={data}
                  colorScale={['silver', 'gold', 'paleturquoise']}
                  radius={100}
                />
                <Card.Text>
                  Total number of members : {members.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="chart">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Books availability</Card.Title>
                <VictoryPie
                  data={booksData}
                  colorScale={['Green', 'Red']}
                  radius={100}
                />
                <Card.Text>Total number of books : {books.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </CardDeck>
      </div>
      <div className="chart">
        <Helmet>
          <title>Home</title>
        </Helmet>{' '}
        <CardDeck>
          <div className="chart-item">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Most borrowed book</Card.Title>
                <br />
                <figure class="book">
                  <ul class="hardcover_front">
                    <li>
                      <img
                        src={mostBorrowdBook.img}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </li>
                    <li></li>
                  </ul>

                  <ul class="page">
                    <li></li>
                    <li>
                      <Link
                        className="btn"
                        to={`/books/${mostBorrowdBook.slug}`}
                      >
                        Details
                      </Link>
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
                </figure>
                <Card.Text>
                  {' '}
                  <br />
                  Total number of borrows : {mostBorrowdBook.borrowedBy.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="chart">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Most active member</Card.Title>
                <MemberItem width="10rem" member={mostActiveUserObj} />
                <Card.Text>Total number of borrows : {occ}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </CardDeck>
        <CardDeck>
          <div className="chart-item">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Latest member joined</Card.Title>
                <MemberItem
                  width="10rem"
                  member={members[members.length - 1]}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="chart">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Latest book added</Card.Title>
                <br />
                <figure class="book">
                  <ul class="hardcover_front">
                    <li>
                      <img
                        src={books[books.length - 1].img}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </li>
                    <li></li>
                  </ul>

                  <ul class="page">
                    <li></li>
                    <li>
                      <Link
                        className="btn"
                        to={`/books/${books[books.length - 1].slug}`}
                      >
                        Details
                      </Link>
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
                </figure>
              </Card.Body>
            </Card>
          </div>
        </CardDeck>
      </div>
    </center>
  );
};
export default Home;
