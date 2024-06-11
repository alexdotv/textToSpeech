import React from 'react'
import './PriceCart.css'
import { CheckCircleOutlined } from '@ant-design/icons';

export default function PriceCart() {
  return (
    <div className="priceCart">
        <h2>Title</h2>
        <div className="cost">
            <p>5$/mo</p>
            <p className='cost-for'>For individuals who want to try out the most advanced AI audio.</p>
        </div>
        <button>Buy</button>
        <div className="plan">
        <h2>Plan</h2>
            <ul className='plan-list'>
                <li> <CheckCircleOutlined /> 1000 token</li>
                <li> <CheckCircleOutlined /> Lorem ipsum dolor sit amet.</li>
                <li> <CheckCircleOutlined /> Lorem ipsum dolor sit.</li>
                <li> <CheckCircleOutlined /> Lorem ipsum dolor sit.</li>
            </ul>
        </div>
    </div>
  )
}
