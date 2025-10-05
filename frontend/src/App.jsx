import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = 'http://localhost:3000/api'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [editingUser, setEditingUser] = useState(null)

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/users`)
      setUsers(response.data.data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      alert('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  // Create user
  const createUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE_URL}/users`, formData)
      setFormData({ name: '', email: '' })
      fetchUsers()
      alert('User created successfully!')
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Error creating user')
    }
  }

  // Update user
  const updateUser = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_BASE_URL}/users/${editingUser.id}`, formData)
      setFormData({ name: '', email: '' })
      setEditingUser(null)
      fetchUsers()
      alert('User updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user')
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${id}`)
        fetchUsers()
        alert('User deleted successfully!')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Error deleting user')
      }
    }
  }

  // Start editing
  const startEdit = (user) => {
    setEditingUser(user)
    setFormData({ name: user.name, email: user.email })
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '' })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>PostgreSQL CRUD App</h1>
        <p>React 18 + Vite + Docker Compose</p>
      </header>

      <main className="app-main">
        {/* User Form */}
        <section className="form-section">
          <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={editingUser ? updateUser : createUser} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter user email"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingUser ? 'Update User' : 'Add User'}
              </button>
              {editingUser && (
                <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Users List */}
        <section className="users-section">
          <div className="section-header">
            <h2>Users List</h2>
            <button onClick={fetchUsers} className="btn btn-refresh" disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="no-users">No users found. Add some users to get started!</div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <small>Created: {new Date(user.created_at).toLocaleDateString()}</small>
                  </div>
                  <div className="user-actions">
                    <button onClick={() => startEdit(user)} className="btn btn-edit">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
