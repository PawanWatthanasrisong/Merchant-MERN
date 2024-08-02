
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from "./pages/ProductScreen";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <a href="/">amazona</a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/product/:slug" element={<ProductScreen/>} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
