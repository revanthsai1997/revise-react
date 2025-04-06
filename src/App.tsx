import './App.css'
import StudentListComponent from './components/StudentListComponent'


function App() {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Student Management System
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Manage Your Students
          </h2>
          <StudentListComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 Student Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
