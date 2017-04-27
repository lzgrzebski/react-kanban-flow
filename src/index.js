import React from 'react';
import ReactDOM from 'react-dom';
import Kanban from './containers/Kanban';
import RandomTasks from './utils/randomTasks';

const render = async () => {
  const tasks = await RandomTasks();

  ReactDOM.render(
    <Kanban state={tasks} />,
    document.getElementById('root'),
  );
};

render();
