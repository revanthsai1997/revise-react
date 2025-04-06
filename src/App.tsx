import './App.css'
import StudentListComponent from './components/StudentListComponent'


function App() {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student CRUD</h1>
      <StudentListComponent />
    </div>
  )
}

export default App
