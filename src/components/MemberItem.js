import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberItem = (props) => {
  let member = props.member;
  let imgClass = '';
  if (member.membership === 'silver') {
    imgClass = 'img-silver';
  } else if (member.membership === 'gold') {
    imgClass = 'img-gold';
  } else if (member.membership === 'platinum') {
    imgClass = 'img-platinum';
  }
  return (
    <Link to={`/members/${member.slug}`}>
      <Card style={{ width: props.width }}>
        <Card.Img
          className={imgClass}
          variant="top"
          src={member.img}
          roundedCircle
        />
        <Card.Body>
          <Card.Title>{`${member.firstName} ${member.lastName}`}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};
export default MemberItem;
