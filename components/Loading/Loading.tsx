import { Ripples } from '@uiball/loaders'
import React from 'react'

function Loading() {
  return (
    <div className='flex w-full items-center justify-center p-10 text-xl'>
    <Ripples size={50} speed={2} color='#1F2937' />
  </div>
  )
}

export default Loading