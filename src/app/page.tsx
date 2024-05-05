'use client'
import Button from "@/components/button";
import TextBox from "@/components/textbox";
import { ComponentEvent } from "@/model/ui/ComponentEvent";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


export default function Result() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    dni: '',
    permiso: '',
    fechaExamen: '',
    fechaNacimiento: ''
  });



  const handleInputChange = async (e:ComponentEvent) => {
    const { name, value } = e;
    await setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=>{
    const stringOfFromData = localStorage.getItem("formData")
    if (stringOfFromData) {
      const savedFormData = JSON.parse(stringOfFromData)
      setFormData(savedFormData)
    }

    

  }, [])


  const formPassed = (event:any) => {
    localStorage.setItem("formData", JSON.stringify(formData))
    router.push(`/result?nifnie=${formData.dni}&fechaExamen=${formData.fechaExamen}&clasepermiso=${formData.permiso}&fechaNacimiento=${formData.fechaNacimiento}`)
  }


  return (
    <main className="bg-white flex flex-col  justify-center items-center h-screen w-screen font-sans">
      <div className={'p-10 border-4 border-blue-300 rounded-lg flex gap-3 flex-col m-10'}>
        <TextBox label={"DNI / NIE"} text={""} placeholder={""} onChange={handleInputChange} name={"dni"} defaultValue={formData.dni}></TextBox>
        <TextBox label={"Tipo de permiso"} text={""} placeholder={""} onChange={handleInputChange} name={"permiso"} defaultValue={formData.permiso}></TextBox>
        <TextBox label={"Fecha del Examen"} text={""} placeholder={"DD/MM/YYYY"} onChange={handleInputChange} name={"fechaExamen"} defaultValue={formData.fechaExamen}></TextBox>
        <TextBox label={"Fecha de nacimiento"} text={""} placeholder={"DD/MM/YYYY"} onChange={handleInputChange} name={"fechaNacimiento"} defaultValue={formData.fechaNacimiento}></TextBox>
        <Button onClick={formPassed} text={"Buscar"} ></Button>
      </div>
      
    </main>
  );
}
