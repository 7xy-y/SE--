import React from 'react';
import Login from './pages/Login/Login'
import TeacherCenter from './pages/TeacherCenter/TeacherCenter';
import EditLesson from './pages/TeacherCenter/EditLesson';
import TApplication from './pages/TeacherCenter/TApplication'
class App extends React.Component{
  render(){
    return (
      <div>
        <Login/>
      </div>
    )
  }
}

export default App
