import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import { JobContext, EstPreviewContext } from './Context';
import AllRoutes from './pages/AllRoutes';


function App() {
  const [job, setJob] = useState('');
  const [estPreview, setEstPreview] = useState('all');
  const [employerForm, setEmplyerForm] = useState({})

  return <>
    <JobContext.Provider value={{ job: job, setJob: setJob }}>
      <EstPreviewContext.Provider value={{ estPreview: estPreview, setEstPreview: setEstPreview }}>
        <AllRoutes/>
      </EstPreviewContext.Provider>
    </JobContext.Provider>

  </>
}

export default App;
