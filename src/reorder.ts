import { DraggableLocation } from "react-beautiful-dnd";
import { ColorMap } from "./types";

// 결과를 재정렬하는 데 도움이 되는 작은 기능
export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number
): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1); // startIndex에서 한개의 값을 추출하고
  result.splice(endIndex, 0, removed); // endIndex쪽에 추출한 값을 삽입한다
  return result;
};

export const reorderColors = (
  colors: ColorMap,
  source: DraggableLocation, // Draggable 이 시작된 위치(location).
  destination: DraggableLocation // Draggable이 끝난 위치(location). 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될것입니다.
) => {
  const current = [...colors[source.droppableId]];
  const next = [...colors[destination.droppableId]];
  const target = current[source.index];

  // 같은 목록으로 이동
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return {
      ...colors,
      [source.droppableId]: reordered,
    };
  }

  // 다른 목록으로 이동

  // 원본에서 제거
  current.splice(source.index, 1);
  // 다음에 삽입
  next.splice(destination.index, 0, target);

  return {
    ...colors,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};
