import "./App.css";
import MainContent from './component/MainContent';
import Container from '@mui/material/Container';
function App() {
  return (
    <><div style={{display:"flex",justifyContent:"center",width:"100vw"}}>
      <Container maxWidth="xl" >
      <MainContent/>
      </Container>
      </div>
    </>
  );
}

export default App;
