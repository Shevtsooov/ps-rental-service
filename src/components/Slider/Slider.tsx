import './Slider.scss';
import poster from '../../assets/images/spider-man.png'

export const Slider: React.FC = () => {

  return (
    <div className="slider">
      <img
        className="slider__poster"
        src={`${poster}`}
        alt=""
      />
    </div>
  );
}
