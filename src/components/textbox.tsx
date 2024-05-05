import { ComponentEvent } from "@/model/ui/ComponentEvent";
import Image from "next/image";




export default function TextBox(
    params:{
        name:string
        text:string, 
        placeholder:string, 
        label:string
        onChange:any,
        defaultValue?:string
        value?:any
    }) {
    let changeEvent: ComponentEvent = {
        name: params.name,
        value: params.defaultValue
    }
 
    const onChange = (event:any) => {
        console.log(params)
        changeEvent.value=event.target.value
        params.onChange(changeEvent)
    }

                
  return (
    <div className={'flex gap-2.5 items-center bg-blue-50 p-1 rounded-md'}>
        <label className={'bold mw-72 flex-grow'}>
            {params.label}
        </label>
        <input
        type="text" className={'w-auto h-9 border-blue-200 border-2 rounded-md px-2 transition-all focus-within:border-blue-400'} 
        onChange={onChange} placeholder={params.placeholder} defaultValue={params.defaultValue}></input>
    </div>

  );
}
