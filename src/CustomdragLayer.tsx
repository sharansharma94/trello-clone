import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer } from "./styles";

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column
          isPreview={true}
          taskId={item.id}
          text={item.text}
          index={item.index}
        />
      </div>
    </CustomDragLayerContainer>
  ) : null;
};

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) return { display: "none" };
  const { x, y } = currentOffset;
  const transform = `translate(${x}px,${y}px)`;
  return { transform, WebkitTransform: transform };
}
