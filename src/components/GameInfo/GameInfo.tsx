import { useState } from 'react';
import './GameInfo.scss';
import cn from 'classnames';

interface Game {
  title: string,
  icon: string,

  price: number,
  discountedPrice?: number | null,
  popularity: number,
};

type Props = {
  game: Game,
}

export const GameInfo: React.FC<Props> = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="game">
      <img
        src={`./images/games/${game.icon}`}
        alt="2"
        className="game_image"
      />
      <h3 className="game_heading">{game.title}</h3>
      <div className="game_price">
        <p className={cn({
          'game_price_regularPrice': game.discountedPrice
        })}>{`${game.price}₴`}</p>
        {game.discountedPrice && (
          <p className="game_price_discountedPrice">{`${game.discountedPrice}₴`}</p>
        )}
      </div>
      <div className="game_buttons">
        <button className="game_buttons_cart">додати</button>
        <button
          className={cn('game_buttons_heart', {
            'game_buttons_heart--active': isOpen
          })}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}
