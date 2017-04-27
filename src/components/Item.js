import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Element = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 3px;
  margin:10px;
  font-family: 'Montserrat', sans-serif;
  font-size:1.4em;
  word-wrap: break-word;
  color:#555;
  line-height:1.58;
  padding: 15px;
  border-top: 4px solid ${prop => prop.color};
  opacity: ${prop => (prop.draggedElementId === prop.id ? '0.5' : '1')};
  filter: ${prop => (prop.draggedElementId === prop.id ? 'grayscale(1)' : 'grayscale(0)')};
  transition: all 0.3s;
`;

const Item = (props) => {
  const handleDragStart = (e) => {
    props.handleDragStart(props.id, props.listId, e);
  };

  const handleDragOver = (e) => {
    props.handleDragOver(props.id, props.listId, e);
  };

  return (
    <Element
      id={props.id}
      listId={props.listId}
      color={props.color}
      draggedElementId={props.draggedElementId}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={props.handleDragEnd}
      onDrop={props.handleDragEnd}
      onDragOver={handleDragOver}
    >
      {props.title}
    </Element>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  draggedElementId: PropTypes.number,
  handleDragOver: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
};

Item.defaultProps = {
  draggedElementId: '',
};

export default Item;
