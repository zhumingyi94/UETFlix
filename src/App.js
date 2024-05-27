import './App.css';
import NavBar from './components/NavBar';
import MainText from './components/MainText';
import TextInput from './components/TextInput';
import RecommendationButton from './components/RecommendationButton';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <MainText></MainText>
      <TextInput></TextInput>
      <RecommendationButton></RecommendationButton>
    </div>
  );
}

export default App;
