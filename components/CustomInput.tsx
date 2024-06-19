import { InputEnumType } from "../types/types";

export const CustomInput = ({
  inputObj,
  index,
  onDelete,
}: {
  inputObj: {
    inputName: string;
    label: string;
    type: InputEnumType;
  }
  onDelete: (index: number) => void;
  index: number;
}) => {
  const {
    inputName, 
    label, 
    type
  } = inputObj;
  
  return (
    <div className="flex gap-6 items-center hover:border-2 py-2 px-4 rounded-lg">
      <label className="w-72" htmlFor={inputName}>{label}</label>
      <input 
        name={inputName} 
        type={type} 
        className="w-72 border-2 border-blue-300 rounded-md p-2 text-slate-500"
      />
      <button 
        onClick={() => onDelete(index)}
        className="rounded-md bg-red-500 px-2 hover:border-2"
      >
        X
      </button>
    </div>
  )
}
