import React from 'react'
import nodata from '../../../assets/images/nodata.png'

export default function NoData() {
  return (
    <>
    <div className="img-container text-center mx-5 d-flex justify-content-center align-content-center h-100">
      <img  className="img-fluid img-margin" src={nodata} alt="no data" ></img>
    </div>
    </>
  )
}}
