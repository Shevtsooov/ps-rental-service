import { useState } from "react";
import cn from "classnames";
import './Accordion.scss';



interface question {
  header: string,
  text: string,
  id: number
};

type Props = {
  faq: question[],
};

export const Accordion: React.FC<Props> = ({ faq }) => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(0);

  const hendleActiveQuestion = (id: number) => {
    if (id === activeQuestionId) {
      setActiveQuestionId(0);

      return;
    }

    setActiveQuestionId(id);
  }

  return (
    <ul className='accordion'>
      {faq.map(question => (
        <div className='accordion__item'>
          <div
            className='accordion__item_header'
            onClick={() => hendleActiveQuestion(question.id)}
          >
            <h4
              className='accordion__item_header--title'
              key={question.id}
            >
              {question.header}
            </h4>
            <span
              className={cn('accordion__item_header--arrow', {
                'accordion__item_header--arrow--active': activeQuestionId === question.id
              })}
            />
          </div>
  
          <p
            className={cn('accordion__item_text', {
              'accordion__item_text--active': activeQuestionId === question.id
            })}
            key={question.id}
          >
            {question.text}
          </p>
        </div>
      ))}
    </ul>
  );
}
