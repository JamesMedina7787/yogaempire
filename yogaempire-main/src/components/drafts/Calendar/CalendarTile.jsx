import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const CalendarTile = ({ id, title, color, index }) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`calendar-tile ${color} p-2 text-white rounded-lg`}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};

export default CalendarTile;
