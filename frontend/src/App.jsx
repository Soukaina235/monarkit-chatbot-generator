import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Routing from './utils/Routing'

function App() {

  return (
    // in the HomePage route, we are using the keyword "exact" to specify that the path should be exactly "/" because ll paths start with "/"
    // but since, i am using a react version which is > 5 then i don't have to specify it anymore
    <div>
      <Router>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App