'use client';
import { getArticle } from './api/api';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
      getArticle().then(data => {
          setAlumnos(data)
      })
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <p>Hola Voices 2</p>
        {alumnos.length >= 1 ? 
          <div>
            {alumnos.map((alumno) => (
              <div key={alumno.nombre}>
                <p>{alumno.nombre}</p>
                <p>{alumno.edad}</p>
                <p>{alumno.instrumento}</p>
              </div>
            ))}
          </div>
        : ""}
      </div>
    </main>
  )
}
