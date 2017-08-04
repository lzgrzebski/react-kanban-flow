import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragAndDrop } from 'simple-react-dnd';

import Wrapper from '../components/Wrapper';
import List from '../components/List';

class Kanban extends Component {
  static removeItem(array, element) {
    return array.filter(e => e !== element);
  }

  state = {
    ...this.props.state,
    draggedElementId: null,
    draggedListId: null,
  }

  getItems(list) {
    return list.map(listElement => this.state.elements[listElement]);
  }

  handleDragStart = (id, listId) => {
    this.setState({
      draggedElementId: id,
      draggedListId: listId,
    });
  }
  handleDragEnd = () => {
    this.setState({
      draggedElementId: null,
      draggedListId: null,
    });
  }

  handleDragOver = (id, listId, showAfter) => {
    if (this.state.draggedElementId === id) return;

    const draggedListId = this.state.draggedListId;
    const draggedElementId = this.state.draggedElementId;
    const lists = Object.assign({}, this.state.lists);
    let index;

    lists[draggedListId] = Kanban.removeItem(lists[draggedListId], draggedElementId);
    index = lists[listId].indexOf(id);
    if (showAfter) index += 1;
    lists[listId].splice(index, 0, draggedElementId);

    this.setState({
      lists,
      draggedListId: listId,
    });
  }

  handleOverEmptyList = (listId) => {
    if (this.state.lists[listId].length > 0) return;

    const lists = Object.assign({}, this.state.lists);
    const draggedElementId = this.state.draggedElementId;
    const draggedListId = this.state.draggedListId;
    lists[draggedListId] = Kanban.removeItem(lists[draggedListId], draggedElementId);
    lists[listId].push(draggedElementId);

    this.setState({
      lists,
      draggedListId: listId,
    });
  }

  render() {
    const listsIds = Object.keys(this.state.lists);
    const listsValues = Object.values(this.state.lists);
    return (
      <Wrapper>
        {
          listsValues.map((list, i) => (
            <List
              key={listsIds[i]}
              listId={listsIds[i]}
              items={this.getItems(list)}
              nrOfColumns={listsIds.length}
              handleDragStart={this.handleDragStart}
              handleDragOver={this.handleDragOver}
              handleDragEnd={this.handleDragEnd}
              handleOverEmptyList={this.handleOverEmptyList}
              draggedElementId={this.state.draggedElementId}
            />
            ),
          )
        }
      </Wrapper>
    );
  }
}

Kanban.propTypes = {
  state: PropTypes.shape({
    elements: PropTypes.object.isRequired,
    lists: PropTypes.object.isRequired,
  }).isRequired,
};

export default DragAndDrop(Kanban);
