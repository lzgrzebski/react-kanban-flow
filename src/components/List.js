import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Item from './Item';

const ListWrapper = styled.div`
  width: ${props => props.width};
  height: 100vh;
`;

const List = (props) => {
  const { nrOfColumns, items, listId } = props;
  const width = `${100 / nrOfColumns}%`;

  const handleOverEmptyList = (e) => {
    props.handleOverEmptyList(listId, e);
  };

  return (
    <ListWrapper
      width={width}
      onDragOver={handleOverEmptyList}
      onDragEnd={props.handleDragEnd}
      onDrop={props.handleDragEnd}
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
  listId: PropTypes.string.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
};

export default List;
