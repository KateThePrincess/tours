import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeTour = (id) => {
    //if the tour id doesnt match the id we are passing in then we return that particular tour
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <div className='title-underline' />
          <button
            type='button'
            className='btn'
            onClick={() => fetchTours()}
            style={{ marginTop: '2rem', padding: '1rem' }}
          >
            Show our tours
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      {/* {!isLoading &&
        tours.map((tour) => {
          const { id, name, info, image, price } = tour;
          return (
            <div key={id}>
              <h2>{name}</h2>
            </div>
          );
        })} */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
