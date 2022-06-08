const {
  createNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
} = require('./handler.js')

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: createNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler
  }
]

module.exports = routes
