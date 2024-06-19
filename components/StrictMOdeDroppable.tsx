import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

/**
 * This function is used in order to bypass the "react-beautiful-dnd - Invariant failed: Cannot find droppable entry with id" issue
 * Checkout https://stackoverflow.com/questions/67780314/react-beautiful-dnd-invariant-failed-cannot-find-droppable-entry-with-id
 */
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};