export default [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 120, y: 25 },
    },
  
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 10, y: 125 },
    },
    {
      id: '3',
     
      data: { label: 'Output Node' },
      position: { x: 250, y: 125 },
    },
  ];
  