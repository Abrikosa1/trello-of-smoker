import React from 'react';
import Card from 'react-bootstrap/Card';
import './taskCard.css';
const TaskCard: React.FC = () => {
  return(
    // <Card style={{ width: '18rem' }}>
    // <Card>
    //   <Card.Body>
    //     <Card.Title>Card Title</Card.Title>
    //     <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    //     <Card.Text>
    //       Some quick example text to build on the card title and make up the bulk of
    //       the card's content.
    //     </Card.Text>
    //     <Card.Link href="#">Card Link</Card.Link>
    //     <Card.Link href="#">Another Link</Card.Link>
    //   </Card.Body>
    // </Card>
    <a className="card">
      <div className="card__details">
        <span className="card__title">Чет сделать</span>
        <div className="card__badges">
          <div className="card__badge">
            <span className="badge__icon badge__icon_sm badge__icon_comment"></span>
            <span className="badge__text">1</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default TaskCard;