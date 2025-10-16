import React from 'react';

// import { Container } from './styles';
async function getData() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log('rodou')
  return [1, 2, 3]
}


async function Success() {
   const list = await getData()
  return (
    <div>
      <h1>Success Page</h1>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Success;
