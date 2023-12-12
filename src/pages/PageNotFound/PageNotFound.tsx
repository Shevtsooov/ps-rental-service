import { useEffect } from "react";
import { NotFound } from "../../components/NotFound/NotFound";
import './PageNotFound.scss';

export const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Упс...';
  }, []);

  return (
    <div className="pageNotFound">
      <NotFound />
    </div>
  )
};
