import React from 'react'
import './Price.css'
import PriceCart from '../../Components/PriceCart/PriceCart'

export default function Price() {
  return (
    <div className='price'>
      <PriceCart />
      <PriceCart />
      <PriceCart />
      <PriceCart />
    </div>
  )
}
