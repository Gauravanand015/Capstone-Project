import Directory from "../../components/directory/directory.components";
import categories from "../../categories.json";


const Home = () => {
  return <Directory categories={categories} />;
};

export default Home;