import { Progress } from '@mantine/core'
import React from 'react'

function UploadingProgress({ progress}) {
  return (
    <div><Progress size="xl" value={progress} animate /> </div>
  )
}

export default UploadingProgress