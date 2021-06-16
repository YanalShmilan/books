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
      
      class="form-control mr-sm-2"  aria-label="Search"
        name="query"
        placeholder="search"
        type="search"
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <div className="book-list">{books}</div>
      <form onSubmit={handleSubmit}>
        Author: {' '}
        <input
        style={{width:"20%" ,margin:"10px" , gap:"2px" }}
          value={book.author}
          name="author"
          onChange={handleChange}
        ></input>
        Title: {' '}
        <input style={{width:"20%" , margin:"10px"}} value={book.title} name="title" onChange={handleChange}></input>
       Genre: {' '}
        <input style={{width:"20%",margin:"10px" }}value={book.genre} name="genre" onChange={handleChange}></input>
        Available {' '}
        <select style={{width:"10%"}} class="custom-select" id="inputGroupSelect01" onChange={handleChange}>
        <option selected style={{fontFamily:"sans-serif"}}>Choose...</option>
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>
        <button style={{width:"7%"}} type="button" class="btn btn-primary btn-lg">Add Book</button>
      </form>{' '}
    </div>
  );
};
export default BooksList;
