import { Form } from '../../components/Form';
import { ListOfData } from '../../components/ListOfData';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <Form />
      <ListOfData />
    </div>
  );
};
