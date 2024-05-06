'use client'
import DataLine from "@/components/dataLine";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from "react";


export default function Result() {
  const [lines, setLines] = useState([""])
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const nifnie = searchParams.get("nifnie")
      const fechaExamen = searchParams.get("fechaExamen")
      const clasePermiso = searchParams.get("clasepermiso")
      const fechaNacimiento = searchParams.get("fechaNacimiento")

      try {
        const res = await fetch(`api/getResult?nifnie=${nifnie}&fechaExamen=${fechaExamen}&clasePermiso=${clasePermiso}&fechaNacimiento=${fechaNacimiento}`)
        const jsonData = await res.json()
        setLines(JSON.parse(jsonData))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [searchParams])

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
    <Suspense fallback={'<>Loading...</>'}>
      <main className="flex items-start justify-center w-screen h-screen pt-10">
        <div className={'flex flex-col gap-3 m-10'}>
          {
            lines.length > 2 ?
            lines.map(((line, i)=>(
              <DataLine key={i} label={"Linea de datos:"} data={line}></DataLine>
            ))) : <div>No hay resultados</div>
          }
          <button onClick={handleShare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share</button>
        </div>
      </main>
    </Suspense>
  );
}
