import React, { Component, PropTypes } from 'react';
import styled, { injectGlobal } from 'styled-components';

import List from '../components/List';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin:0;
    background:#fafafa;
  }
`;

const Wrapper = styled.section`
  display:flex;
`;

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

  handleDragStart = (id, listId, e) => {
    this.setState({
      draggedElementId: id,
      draggedListId: listId,
    });

    if (e.dataTransfer !== undefined) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('text', id); // firefox fix
    }
  }
  handleDragEnd = (e) => {
    e.preventDefault();
    this.setState({
      draggedElementId: null,
      draggedListId: null,
    });
  }

  handleDragOver = (id, listId, e) => {
    e.preventDefault();
    if (this.state.draggedElementId === id) return;

    const overElementHeight = e.currentTarget.getBoundingClientRect().height / 2;
    const overElementTopOffset = e.currentTarget.getBoundingClientRect().top;
    const mousePositionY = e.clientY;

    const showAfter = mousePositionY - overElementTopOffset > overElementHeight;

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

  handleOverEmptyList = (listId, e) => {
    e.preventDefault();
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

export default Kanban;
