import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addBook } from '../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

const BooksList = () => {
  const dispatch = useDispatch();

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
  };

  return (
    <div>
      search:{' '}
      <input
        name="query"
        placeholder="search"
        type="search"
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <div className="book-list">{books}</div>
      <form onSubmit={handleSubmit}>
        author:{' '}
        <input
          value={book.author}
          name="author"
          onChange={handleChange}
        ></input>
        title:{' '}
        <input value={book.title} name="title" onChange={handleChange}></input>
        genre: sepreate by a coma{' '}
        <input value={book.genre} name="genre" onChange={handleChange}></input>
        available{' '}
        <select name="available" onChange={handleChange}>
          <option value={true}>available</option>
          <option value={false}>not Available</option>
        </select>
        <button type="submit">Add Book</button>
      </form>{' '}
    </div>
  );
};
export default BooksList;
