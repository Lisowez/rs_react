import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.notFoundPage}>
      <h1 className={s.title}>404</h1>
      <p className={s.text}>Page not found</p>
      <button className={s.btn} onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFoundPage;
