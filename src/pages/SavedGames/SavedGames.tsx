import React, { useEffect } from 'react';
import './SavedGames.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { GameList } from '../../components/GameList/GameList';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';
import { hardSetSavedGames, resetSavedGames } from '../../Redux/Slices/savedGames.slice';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { Loader } from '../../components/Loader/Loader';

export const SavedGames: React.FC = () => {
  const savedGames = useAppSelector(state => state.savedGames.value);
  const user = useAppSelector(state => state.user.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: games } = useGetAllGamesQuery();

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);
  
  // useEffect(() => {
  //   dispatch(resetSavedGames());
    
  //   if (user) {
  //     const savedGameIds = user?.likedGames;

  //     const gamesToAdd = games?.filter((game) => savedGameIds.includes(game.gameId));

  //     dispatch(hardSetSavedGames(gamesToAdd));
  //   }
  // }, [user]);

  useEffect(() => {
    dispatch(resetSavedGames());
  
    if (user) {
      const gamesToAdd = games?.filter((game) => (
        user.likedGames.includes(game.gameId)
      ));
  
      dispatch(hardSetSavedGames(gamesToAdd));
    }
  }, [user, games, dispatch]);

  useEffect(() => {
    if (!refreshTokenService.get()) {
      navigate('/');
    }
  }, []);

  if (!user) {
    return <Loader />
  }

  return (
    <div className="savedGames">
      <h1 className='savedGames__title'>Збережені ігри</h1>
      <p
        className='savedGames__amount'
      >
        {`Кількість ігор: ${
          savedGames
            ? savedGames.length
            : 'обрахування...'
          }`}
      </p>

      {savedGames && savedGames.length
        ? <GameList games={savedGames} />
        : (
          <div className="savedGames__empty_list">
            <h4 className="savedGames__empty_list_heading">
              Ти ще не зберіг жодної гри
            </h4>

            <button className="savedGames__empty_list_button">
              <Link
                to="/games"
                className="savedGames__empty_list_button--link"
              >
                До списку ігор
              </Link>
            </button>
          </div>
        )}

    </div>
  );
}
