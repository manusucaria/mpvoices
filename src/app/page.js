'use client';
import { getArticle } from './api/api.js';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
      getArticle().then(data => {
          setAlumnos(data)
      })
  }, []);
  console.log(alumnos)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <p>Hola Voices</p>
      </div>
    </main>
  )
}
