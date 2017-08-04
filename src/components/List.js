import React from 'react';
import PropTypes from 'prop-types';
import { Drop } from 'simple-react-dnd';

import ListWrapper from './ListWrapper';
import Item from './Item';

const List = (props) => {
  const { nrOfColumns, items } = props;
  const width = `${100 / nrOfColumns}%`;

  return (
    <ListWrapper
      width={width}
    >
      {
        items.map(item => (
          <Item key={item.id} {...item} {...props} />
        ))
      }
    </ListWrapper>
  );
};

List.propTypes = {
  nrOfColumns: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Drop({
  onDragOver: props => props.handleOverEmptyList(props.listId),
  onDragEnd: props => props.handleDragEnd(),
  onDrop: props => props.handleDragEnd(),
})(List);
