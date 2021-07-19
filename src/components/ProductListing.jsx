import React from 'react'
import { CountContext } from '../context/CountProvider'

export default function ProductListing({ products }) {
  // console.log('CountContext', CountContext)
  return (
    <CountContext.Consumer>
      {(state) => {
        console.log('state', state)
        if (!state) return <p>Context is empty...</p>
        return (
          <ul class="products">
            {typeof products !== 'undefined' && products?.length
              ? products.map((product) => {
                  let image = product.images.edges[0].node
                  return (
                    <li className="product">
                      <a href={`/product/${product.handle}`}>
                        <div className="frame">
                          <img className="prodimg" src={image.src} alt={image.altText} />
                        </div>
                        <h2>{product.title}</h2>
                        <b>state: {context}</b>
                        <p>{product.description.substring(0, 60)}...</p>
                      </a>
                    </li>
                  )
              })
              : <p>Context is empty...</p>
            }
          </ul>
        )
      }}
    </CountContext.Consumer>
  )
}
