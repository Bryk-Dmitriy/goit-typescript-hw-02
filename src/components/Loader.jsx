import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <Oval height={50} width={50}/>
    </div>
  );
};