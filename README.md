# Some implementations of react-table

Using this awesome [package](https://react-table.tanstack.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contents

### `Simple Table`

Basic implementation of react-table

### `Block Table`

Using div to build the table, using `useBlockLayout` utility 

### `Fluid Table`

Modify the _Block Table_ above so it can fill container width instead of explicitly specify it's size

### `Virtualized Table`

Modify the _Fluid Table_ to make it displays only visible rows using `react-window` so it doesn't get slow when there are so many rows to render

## How?

1. `git clone https://github.com/sagwascript/react-table-yolo.git`
2. `cd react-table-yolo`
3. `yarn` or `npm install`
4. `yarn start` or `npm start`