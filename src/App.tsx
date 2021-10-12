import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderColors } from "./reorder";
import { ColorMap } from "./types";
import { AuthorList } from "./AuthorList";


// ref: https://learncoding.map4b.com/2019/04/react-drag-and-drop-multiple-horizontal-lists/
const App = () => {
  const [colorMap, setColors] = React.useState<ColorMap>({
    a: ["blue", "red", "yellow"],
    b: ["pink"],
    c: ["green", "tan"]
  });

  return (
    <DragDropContext
      onDragEnd={({ 
        destination, // Draggable이 끝난 위치(location). 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될것입니다.
        source // Draggable 이 시작된 위치(location).
       }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setColors(reorderColors(colorMap, source, destination));
      }}
    >
      <div>
        {JSON.stringify(colorMap)}
        {Object.entries(colorMap).map(([k, v]) => (
          <AuthorList
            internalScroll
            key={k}
            listId={k} // Droppable droppableId로 쓰임
            listType="CARD" // Droppable type으로 쓰임
            colors={v}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
