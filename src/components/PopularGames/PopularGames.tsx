import './PopularGames.scss';

export const PopularGames: React.FC = () => {

  return (
    <div className="popularGames">
      <h2 className="popularGames__heading">Вибір гравців:</h2>
      <p className="popularGames__description">
        ТОП-6 ігор, які замовляють наші гравці
      </p>
      <div className="popularGames__list">
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
        <div className="popularGames__game">
          <img
            src="1"
            alt="2"
            className="popularGames__game_image"
          />
          <h3 className="popularGames__game_heading">Довга дуже дуже дуже Назва гри</h3>
          <button className="popularGames__game_button">додати</button>
        </div>
      </div>
    </div>
  );
}
