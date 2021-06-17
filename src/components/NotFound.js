import { Link, useParams, useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <center>
      {' '}
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Error 404: Page Not Found</h1>
      <button className="btn-btee5" onClick={() => history.push('/')}>
        Go home
      </button>
    </center>
  );
};

export default NotFound;
