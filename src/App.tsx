import { Provider } from "react-redux";
import { store } from "./redux/store";
import GraphContainer from "./components/GraphContainer";
const App = () => {
  return (
    <Provider store={store}>
      <h1>Graph Visualization</h1>
      <GraphContainer />
    </Provider>
  );
};

export default App;
