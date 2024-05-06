'use client'
import DataLine from "@/components/dataLine";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from "react";


export default function Result() {
  const a = "http://localhost:3000/api/getResult?nifnie=54641859T&fechaExamen=27/01/2023&clasepermiso=B&fechaNacimiento=28/11/2002"
  const searchParams = useSearchParams()
  const [lines, setLines] = useState([""])


  const fetchData = () => {
    
    const nifnie = searchParams.get("nifnie")
    const fechaExamen = searchParams.get("fechaExamen")
    const clasePermiso = searchParams.get("clasepermiso")
    const fechaNacimiento = searchParams.get("fechaNacimiento")

    fetch(`api/getResult?nifnie=${nifnie}&fechaExamen=${fechaExamen}&clasePermiso=${clasePermiso}&fechaNacimiento=${fechaNacimiento}`).then((res)=>res.json().then((jsonData=>{
      console.log(jsonData)
      setLines(JSON.parse(jsonData))
    })))
  }
  useEffect(()=>{
    fetchData()
  }, [])

  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check your result',
        url: window.location.href
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      console.log("URL copied to clipboard:", window.location.href);
    }
  }

  return (
  

        <main className="flex items-start justify-center w-screen h-screen pt-10">
          <div className={'flex flex-col gap-3 m-10'}>
          
            {
              lines.length > 2 ?
              lines.map(((line, i)=>(
                <Suspense>
                  <DataLine key={i} label={"Linea de datos:"} data={line}></DataLine>
                </Suspense>
                
              ))) : <div>No hay resultados</div>
              
              }
        

            <button onClick={handleShare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share</button>
          </div>
        </main>
        
   
    
 
  );
}