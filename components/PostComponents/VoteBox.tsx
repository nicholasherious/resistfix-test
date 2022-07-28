import React from 'react'
import {ThumbDownIcon, ThumbUpIcon} from '@heroicons/react/outline'
function VoteBox() {
  return (
    <div className="flex mt-3 mr-2">
        <div className="flex">
            <ThumbUpIcon className="h-8 w-8 text-gray-600 hover:text-green-400 cursor-pointer"/>
            <ThumbDownIcon className="h-8 w-8 text-gray-600 hover:text-red-400 cursor-pointer" />
        </div>
        
        </div>
  )
}

export default VoteBox