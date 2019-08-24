import { IResolvers, ApolloError } from 'apollo-server-express'
import axios from 'axios'

import { validateMime, saveFile, deleteFile } from '../utils/upload'

const proxy: string = 'http://localhost:3000'

const resolvers: IResolvers = {
  File: {
    author: async ({ authorId }) => {
      try {
        const { data } = await axios.get(`${proxy}/authors/${authorId}`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Author not found', status)
      }
    }
  },
  Author: {
    files: async ({ id }) => {
      try {
        const { data } = await axios.get(`${proxy}/authors/${id}/files`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Files not found', status)
      }
    }
  },
  Query: {
    file: async (_parent, { id }, _context) => {
      try {
        const { data } = await axios.get(`${proxy}/files/${id}`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('File not found', status)
      }
    },
    files: async () => {
      try {
        const { data } = await axios.get(`${proxy}/files`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Files not found', status)
      }
    },
    author: async (_parent, { id }, _context) => {
      try {
        const { data } = await axios.get(`${proxy}/authors/${id}`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Author not found', status)
      }
    },
    authors: async () => {
      try {
        const { data } = await axios.get(`${proxy}/authors`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Authors not found', status)
      }
    }
  },
  Mutation: {
    createAuthor: async (_parent, { name, age }, _context) => {
      try {
        const { data } = await axios.post(`${proxy}/authors`, { name, age })
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    },
    updateAuthor: async (_parent, { id, name, age }, _context) => {
      try {
        const { data } = await axios.put(`${proxy}/authors/${id}`, { name, age })
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    },
    deleteAuthor: async (_parent, { id }, _context) => {
      try {
        const { data } = await axios.delete(`${proxy}/authors/${id}`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    },
    createFile: async (_parent, { authorId, file }, _context) => {
      try {
        const { filename, mimetype, createReadStream } = await file
        if (!validateMime(mimetype, ['pdf', 'png'])) {
          return new ApolloError('File format not allowed', '400')
        }
        const path = await saveFile(createReadStream(), filename)
        const { data } = await axios.post(`${proxy}/files`, { authorId, filename, path })
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    },
    updateFile: async (_parent, { id, authorId, file }, _context) => {
      try {
        const { filename, mimetype, createReadStream } = await file
        if (!validateMime(mimetype, ['pdf', 'png'])) {
          return new ApolloError('File format not allowed', '400')
        }
        const path = await saveFile(createReadStream(), filename)
        // Delete old file
        const { data: oldData } = await axios.get(`${proxy}/files/${id}`)
        await deleteFile(oldData.path)
        const { data } = await axios.put(`${proxy}/files/${id}`, { authorId, filename, path })
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    },
    deleteFile: async (_parent, { id }, _context) => {
      try {
        const { data } = await axios.delete(`${proxy}/files/${id}`)
        return data
      } catch ({ response: { status } }) {
        return new ApolloError('Error', status)
      }
    }
  }
}

export default resolvers
