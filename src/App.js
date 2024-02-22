import About from "./About.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Missing from "./Missing.js";
import Nav from "./Nav.js";
import NewPost from "./NewPost.js";
import PostPage from "./PostPage.js";
import EditPost from "./EditPost.js";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext.js";

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header title="Facebook" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
