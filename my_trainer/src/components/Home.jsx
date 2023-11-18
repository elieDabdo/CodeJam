
import React from 'react';
import NavBar from './NavBar/NavBar';
import Grid from './Grid/Grid';

const Home = () => {
  return (
    <>
        <div>
          <h1>Welcome to My Trainer</h1>
          <p>This is the home page of our application.</p>
        </div>
        <Grid/>
    </>
  );
};

export default Home;
