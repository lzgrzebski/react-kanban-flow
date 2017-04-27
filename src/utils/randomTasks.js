import fetch from 'axios';

const URL = 'https://api.github.com/repos/facebook/react/issues';
const COLORS = ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export default async () => {
  const INITIAL_STATE = {
    elements: {

    },
    lists: {
      l1: [],
      l2: [],
      l3: [],
      l4: [],
      l5: [],
    },
  };

  const tasks = await fetch(URL);
  tasks.data.forEach(({ title, id }) => {
    const colorIndex = getRandomInt(0, 6);
    const listIndex = getRandomInt(1, 5);

    INITIAL_STATE.elements[id] = {
      id,
      title,
      color: COLORS[colorIndex],
    };

    INITIAL_STATE.lists[`l${listIndex}`].push(id);
  });
  return INITIAL_STATE;
};
