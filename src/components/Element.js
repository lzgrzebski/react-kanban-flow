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
  cursor: move;

  &:hover {
    border-left-color: rgba(0,0,0,.2);
    border-right-color: rgba(0,0,0,.2);
    border-bottom-color: rgba(0,0,0,.2);
  }
`;

export default Element;
