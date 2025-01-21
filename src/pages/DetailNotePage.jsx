import React from 'react'
import { useParams } from 'react-router-dom'

function DetailNotePage() {
  const { noteId } = useParams()

  return (
    <div className='note-app__body'>
      DetailNotePage {noteId}
    </div>
  )
}

export default DetailNotePage