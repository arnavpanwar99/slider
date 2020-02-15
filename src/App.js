import React from 'react';
import Slider from './components/Slider/Slider';
import Card from './components/Card/Card';

function App() {
  return (
    <>
      <Slider 
       data={data}
       period={4} 
       offset={2} 
       renderItem={renderItem} 
      />
    </>
  );
}

const renderItem = (item) => {
  return <Card data={item} />
}

const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export default App;


/* 
conatinerStyle,
buttonContainerStyle,
buttonBackgroundStyle,
buttonLeftStyle,
buttonRightStle
*/