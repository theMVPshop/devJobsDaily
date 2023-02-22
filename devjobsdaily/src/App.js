import './App.css';
import Navbar from './navbar';
import Bx1 from './bx1';
import Bx2 from './bx2';
import Bx3 from './bx3';
// import Bxbottom from './bxbottom';

function App() {
  return (
    <div className="App">
      <section>
      <Navbar/>
      </section>


      <main className="main">
        
        <Bx1/>
        <Bx2/>
        <Bx3/>

      </main>
{/* 
    <section>
      <Bxbottom/>
    </section> */}
    </div>
  );
}

export default App
;