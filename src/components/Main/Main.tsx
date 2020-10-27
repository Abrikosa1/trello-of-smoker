import React from 'react';
import Container from 'react-bootstrap/Navbar';
import TaskCard from '../TaskCard/TaskCard';

const Main: React.FC = () => {
  return(
    <>
      <main>
        <Container>
          <TaskCard />
        </Container>
      </main>
    </>
  );
}

export default Main;