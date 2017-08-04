import React from 'react';
import PropTypes from 'prop-types';
import { Drag, Drop } from 'simple-react-dnd';

import Element from './Element';

const Item = props => (
  <Element
    id={props.id}
    listId={props.listId}
    color={props.color}
    draggedElementId={props.draggedElementId}
  >
    {props.title}
  </Element>
);

Item.propTypes = {
  id: PropTypes.number.isRequired,
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  draggedElementId: PropTypes.number,
};

Item.defaultProps = {
  draggedElementId: '',
};

export default Drop({
  onDrop: props => props.handleDragEnd(),
  onDragOver: (props, showAfter) => props.handleDragOver(props.id, props.listId, showAfter),
})(Drag({
  onDrop: props => props.handleDragEnd(),
  onDragOver: (props, showAfter) => props.handleDragOver(props.id, props.listId, showAfter),
  onDragStart: props => props.handleDragStart(props.id, props.listId),
  onDragEnd: props => props.handleDragEnd(),
})(Item));
