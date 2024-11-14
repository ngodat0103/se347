import Register from './pages/Register';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  let [page, setPage] = useState(<Login changePage={changePage}/>);

  function changePage(page: string) {
    if (page === "register") {
      setPage(<Register changePage={changePage}/>)
    } else if (page === "login") {
      setPage(<Login changePage={changePage}/>)
    }
  }

  return (
    <>
      {page}
    </>
  )
}

export default App
