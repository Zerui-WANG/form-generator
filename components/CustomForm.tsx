import { FormValuesType, InputEnumType } from "@/types/types";
import { MutableRefObject, useRef, useState } from "react";
import { FormPreview } from "./FormPreview";

export const CustomForm = () => {
    const [formValues, setFormValues] = useState<FormValuesType>([]);

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const selectRef: MutableRefObject<HTMLSelectElement | null> = useRef(null);

  const handleAddField = () => {
    const values = [...formValues];
    
    values.push({
      label: inputRef.current?.value || 'label',
      inputName: inputRef.current?.value || 'valuename',
      value: '',
      type: selectRef.current?.value as InputEnumType || InputEnumType.Text,
    });
    
    setFormValues(values);
  }

  const handleFormReload = () => {
    const storageFormValues = JSON.parse(localStorage.getItem('form') ?? '')
    setFormValues(storageFormValues);
  }

  return (
    <div className="flex flex-col min-h-screen gap-y-5 w-1/2">
      <button 
        className="p-2 m-10 underline text-lg hover:text-sky-300" 
        onClick={handleFormReload}
      >
        Charger le formulaire enregistré
      </button>
      <div className="flex gap-4 items-center p-2">
        <label htmlFor="newInput">Ajouter un nouveau champs</label>
        <input 
          name="newInput" 
          type="text" 
          placeholder="label" 
          ref={inputRef} 
          className="border-2 border-blue-300 rounded-md p-2 text-slate-500"
        />
        <select 
          ref={selectRef}
          className="border-2 border-blue-300 rounded-md p-2 text-slate-500"
        >
          <option value="text">Text</option>
          <option value="checkbox">Case à cocher</option>
        </select>
        <button 
          className="border-2 rounded-md px-6 py-2 bg-sky-950 hover:bg-sky-900"
          onClick={handleAddField}
        >
          Ajouter
        </button>
      </div>
      <div className="bg-slate-500 rounded-md p-12">
        <h2 className="text-2xl">Votre formulaire</h2>
        <div className="p-10">
          <FormPreview formValues={formValues} setFormValues={setFormValues} />
        </div>
      </div>
    </div>
  )
}
