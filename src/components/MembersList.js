import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addMember } from '../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MembersList = () => {
  const dispatch = useDispatch();
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    currentlyBorrowedBooks: [],
    membership: 'gold',
  });
  let members = useSelector((state) => state.members);
  members = members.map((member) => (
    <li>
      <Link to={`/members/${member.slug}`}>
        {member.firstName} {member.lastName}- {member.membership}
      </Link>
    </li>
  ));
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
  };

  return (
    <div>
      {members}
      <form onSubmit={handleSubmit}>
        firstName:{' '}
        <input
          value={member.firstName}
          name="firstName"
          onChange={handleChange}
        ></input>
        lastName:{' '}
        <input
          value={member.lastName}
          name="lastName"
          onChange={handleChange}
        ></input>
        membership:{' '}
        <select name="membership" onChange={handleChange}>
          <option value="gold">gold</option>
          <option value="silver">silver</option>
          <option value="platinum">platinum</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default MembersList;
