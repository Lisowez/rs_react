import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Details.module.css';
import { ThemeContext } from '../App';

interface IItem {
  name: string;
  actor: string;
  yearOfBirth: number;
  house: string;
  image: string;
}

const Details = () => {
  const [infoUser, setInfoUser] = useState<IItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useLocation();
  const id = params.search.split('=')[1];
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const response = await fetch(
        `https://hp-api.onrender.com/api/character/${id}`
      );
      const data = await response.json();
      setIsLoading(false);
      setInfoUser(data[0]);
    };

    fetchUser();
  }, [params, id]);

  return (
    <div
      className={s.infoUser}
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'yellow',
        borderLeft: theme === 'light' ? '5px solid black' : '5px solid yellow',
      }}
    >
      {!isLoading && (
        <>
          <div
            className={s.close}
            style={{
              color: theme === 'light' ? 'black' : 'yellow',
              backgroundColor: theme === 'light' ? 'white' : 'black',
            }}
          >
            <button
              style={{
                color: theme === 'light' ? 'black' : 'yellow',
                backgroundColor: theme === 'light' ? 'white' : 'black',
              }}
              className={s.closeBtn}
              onClick={() => {
                const curentPathName = params.pathname;
                const currentPathName = curentPathName.split('/');
                const slashIndex = currentPathName.lastIndexOf('details');
                const targetPath = currentPathName
                  .slice(0, slashIndex)
                  .join('/');
                navigate(targetPath);
              }}
            >
              X
            </button>
          </div>
          <img className={s.item_img} src={infoUser?.image} alt={`not image`} />
          <p className={s.item_year}>Year of birth: {infoUser?.yearOfBirth}</p>
          <p className={s.item_name}>Name: {infoUser?.name}</p>
          <p className={s.item_house}>Faculty: {infoUser?.house}</p>
          <p className={s.item_actor}>Actor: {infoUser?.actor}</p>
        </>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Details;
