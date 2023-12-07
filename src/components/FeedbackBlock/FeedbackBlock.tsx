import './FeedbackBlock.scss';
import cn from 'classnames';

type Props = {
  title: string,
  description: string,
  value: number | null,
  setValue: (value: number) => void,
  isError: boolean,
}

export const FeedbackBlock: React.FC<Props> = ({
  title,
  description,
  value,
  setValue,
  isError,
}) => {

  return (
    <div
      className={cn( 'feedbackBlock', {
        'feedbackBlock--error': isError
      })}
    >
      <h3 className='feedbackBlock__title'>
        {title}
      </h3>

      <p className='feedbackBlock__description'>
        {description}
      </p>

      <div className='feedbackBlock__buttons'>
        <button
          className={cn('feedbackBlock__button', {
            'feedbackBlock__button--active': value && value >= 1
          })}
          onClick={() => setValue(1)}
        />

        <button
          className={cn('feedbackBlock__button', {
            'feedbackBlock__button--active': value && value >= 2
          })}
          onClick={() => setValue(2)}
        />

        <button
          className={cn('feedbackBlock__button', {
            'feedbackBlock__button--active': value && value >= 3
          })}
          onClick={() => setValue(3)}
        />

        <button
          className={cn('feedbackBlock__button', {
            'feedbackBlock__button--active': value && value >= 4
          })}
          onClick={() => setValue(4)}
        />

        <button
          className={cn('feedbackBlock__button', {
            'feedbackBlock__button--active': value && value >= 5
          })}
          onClick={() => setValue(5)}
        />
      </div>
    </div>
  );
}
