import './AboutPS5.scss';
import ps5_main from '../../assets/videos/PS5_main.mp4'

export const AboutPS5: React.FC = () => {

  return (
    <div className="aboutPS5">
      <video
        // controls
        muted
        src={`${ps5_main}`}
        // autoPlay={true}
        loop={true}
        className="aboutPS5__video"
      >
      </video>
      <button className="aboutPS5__button">Дізнатись більше про PS5</button>
    </div>
  );
}
