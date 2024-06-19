import { FormValuesType } from "@/types/types";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { CustomInput } from "./CustomInput";
import { StrictModeDroppable } from "./StrictMOdeDroppable";

export const FormPreview = ({
  formValues,
  setFormValues,
}: {
  formValues: FormValuesType;
  setFormValues: Dispatch<SetStateAction<FormValuesType>>
}) => {  
  const handleDeleteField = (index: number) => {
    const values = [...formValues];
    values.splice(index, 1);

    setFormValues(values);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('form', JSON.stringify(formValues))
  }

  const reorderInputs = (result: DropResult) => {
    const startIndex = result.source.index;
    const endIndex = result.destination?.index ?? startIndex;

    setFormValues((currInput) => {
      const  values = [...currInput];
      const [removed] = values.splice(startIndex, 1);
      values.splice(endIndex, 0, removed);

      return values;
    });
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-2"
    >
      <DragDropContext onDragEnd={reorderInputs}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formValues.map((currInput, index) => {
                return (
                  <Draggable 
                    key={`${currInput.label}-${index}`} 
                    draggableId={`${currInput.label}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CustomInput 
                          inputObj={currInput}
                          onDelete={handleDeleteField}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                )}
              )}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <div className="flex justify-center mt-16">
        <button className="border-2 rounded-md px-6 py-2 bg-sky-950 hover:bg-sky-900">
          Enregistrer le formulaire
        </button>
      </div>
    </form>
  )
}
