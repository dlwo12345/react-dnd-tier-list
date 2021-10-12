import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

interface Props {
  colors: string[];
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const AuthorList: React.FC<Props> = ({ listId, listType, colors }) => {
  return (
    <Droppable
      droppableId={listId} // 애플리케이션에 대한 드랍 가능 여부를 식별하는 유니크 식별자
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {dropProvided => (
        <div {...dropProvided.droppableProps}>
          <div>
            <div>
              <div style={{ display: "flex", border: '1px solid #aaa', minHeight: '20px' }} ref={dropProvided.innerRef}>
                {colors.map((color, index) => (
                  <Draggable key={color} draggableId={color} index={index}>
                    {dragProvided => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <span style={{ backgroundColor: color }} onClick={(e) => {
                          console.log('e', e);
                        }}>{color}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* {dropProvided.placeholder} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
