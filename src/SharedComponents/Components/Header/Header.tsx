import React from 'react'
import header from '../../../assets/images/header.png'

type HeaderProps = {
  title: string;
  description?: string;
  imgUrl?: string;
};


export default function Header({title,description,imgUrl}:HeaderProps) {
  return (
  <>
<header className="bg-header overflow-hidden rounded rounded-4">
  <div className="container-fluid px-0">
    <div className="row align-items-center p-3 text-white">
      
      <div className="col-12 col-md-8">
        <h1>{title}</h1> 
        <p>{description}</p>
      </div>

      <div className="col-12 col-md-4 text-end">
      <img className="img-fluid w-75" src={imgUrl} alt='header' />
      </div>

    </div>
  </div>
</header>
  </>
  )
}