const { v4: uuidv4 } = require('uuid')
const notes = require('./notes.js')

const createNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = uuidv4()
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    id,
    title,
    tags,
    createdAt,
    updatedAt,
    body
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note has been added successfully.',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to add note.'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = (request, h) => ({
  status: 'success',
  data: {
    notes
  }
})

const getNoteHandler = (request, h) => {
  const { id } = request.params
  const note = notes.filter(note => note.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: { note }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex(note => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const index = notes.findIndex(note => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  createNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
}
