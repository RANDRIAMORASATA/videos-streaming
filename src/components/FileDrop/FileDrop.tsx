/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/06/2024 03:58:49
*/
import React, { FC, useEffect, useState } from 'react';
import './FileDrop.css';


interface FileDropProps {
  
  onFileDrop : (files: Array<File>)=> void
}


const FileDrop : FC<FileDropProps> = ({onFileDrop}) =>{
  const [dragging, setDragging] = useState<boolean>(false)

  const hundleDragEnter = (event :any)=>{
      event.preventDefault()
      setDragging(true)
  }
  const handleDragLeave = ()=>{
    console.log('leav')
  }
  const handleDragOver = ()=>{
    console.log('over')

  }
  const handleDrop = (event : any)=>{
    event.preventDefault()
      setDragging(false)
      const files: File[] = Array.from(event.dataTransfer.files)
      onFileDrop(files)
      console.log(files)
  }
   

  return (
      <div className="FileDrop">
          <div className="upload-zone"
          onDragEnter = {hundleDragEnter}
          onDragLeave = {handleDragLeave}
          onDragOver = {handleDragOver}
          onDrop = {handleDrop}
          >
            
            <p>Glissez deposer vos fichier videos !</p>
          </div>
      </div>
  );
}

export default FileDrop;