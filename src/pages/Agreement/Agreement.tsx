import React, { useEffect } from 'react';
import './Agreement.scss';
import { BookPS } from '../../components/BookPS/BookPS';
import { NavLink } from 'react-router-dom';


export const Agreement: React.FC = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);
  
  return (
    <div className="agreement">
      <h1 className="agreement__title">Умови прокату</h1>

      <nav>
        <ol className='agreement__navItems'>
          <a 
          className='agreement__navItem'
          href="#Депозит">
            <li>Депозит</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Комплект PlayStation">
            <li>Комплект PlayStation</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Тривалість Оренди">
            <li>Тривалість Оренди</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Умови Повернення">
            <li>Умови Повернення</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Відповідальність за пошкодження">
            <li>Відповідальність за пошкодження</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Платіжні Умови">
            <li>Платіжні Умови</li>
          </a>

          <a 
          className='agreement__navItem'
          href="#Заборгованість">
            <li>Заборгованість</li>
          </a>
        </ol>
      </nav>

      <div className='agreement__statement' id="Депозит">
        <h2 className='agreement__statementTitle'>Депозит</h2>

        <p className="agreement__paragraph">Депозит складає 3000грн.</p>

        <p className="agreement__paragraph">Депозит є заставою, взятою для забезпечення вартості пристрою та його аксесуарів.</p>

        <p className="agreement__paragraph">Депозит повертається в повному обсязі, якщо все обладнання відповідає належному(неушкодженому) стану.</p>


      </div>

      <div className='agreement__statement' id="Комплект PlayStation">
        <h2 className='agreement__statementTitle' >Комплект PlayStation</h2>

        <p className="agreement__paragraph">В оренду входить: </p>
          <ul>
            <li>- Консоль PlayStation 5;</li>
            <li>- Кабель живлення;</li>
            <li>- HDMI кабель;</li>
            <br />
            <li>- 1 контролер (другий за бажанням);</li>
            <li>- 1 кабель Type C на Type A;</li>
            <br />
            <li>- Бокс для доставки/перенесення консолі.</li>
          </ul>
      </div>

      <div className='agreement__statement' id="Тривалість Оренди">
        <h2 className='agreement__statementTitle'>Тривалість Оренди</h2>

        <p className="agreement__paragraph">Тривалість оренди становить 24 години з моменту видачі обладнання. Прохання повертати пристрій не пізніше ніж через 24 години з моменту отримання.</p>

        <p className="agreement__paragraph agreement__paragraph--warning">
          Також хочемо попередити вас, щодо особливостей часу отримання консолі. Час видачі обладнання залежить від часу завершення попередньої оренди. Тобто, якщо попередній орендар взяв пристрій у вечірній період, то наступним орендар зможе отримати приставку не  раніше вечора свого першого заброньованого дня.
        </p>

        <p className="agreement__paragraph">Ми розуміємо, що точний час отримання може бути важливим для вас, і робимо все можливе, щоб забезпечити якнайшвидше видання обладнання. Прохання розуміти цю особливість і уточнювати час отримання в менеджерів перед замовленням, або ж запитувати в коментарі до замовлення.</p>

        <p className="agreement__paragraph">Наші менеджери зв'язуються з кожним орендарем після його замовлення для уточнення всіх деталей.</p>

        <p className="agreement__paragraph">Дякуємо за ваше розуміння та співпрацю!</p>

      </div>

      <div className='agreement__statement' id="Умови Повернення">
        <h2 className='agreement__statementTitle'>Умови Повернення</h2>

        <p className="agreement__paragraph">При поверненні обладнання у визначений строк, в повному обсязі та у непошкодженому стані, депозит повертається орендатору.</p>
      </div>

      <div className='agreement__statement' id="Відповідальність за пошкодження">
        <h2 className='agreement__statementTitle'>Відповідальність за пошкодження</h2>

        <p className="agreement__paragraph">Орендатор зобов'язаний нести відповідальність за кожне пошкодження або втрату обладнання під час періоду оренди.</p>
      </div>
  
      <div className='agreement__statement' id="Платіжні Умови">
        <h2 className='agreement__statementTitle'>Платіжні Умови</h2>

        <p className="agreement__paragraph">Оплата оренди та депозиту здійснюється перед отриманням пристрою. Безпека та повернення депозиту залежать від стану повернутого обладнання.</p>
      </div>


      <div className='agreement__statement' id="Заборгованість">
        <h2 className='agreement__statementTitle'>Заборгованість</h2>

        <p className="agreement__paragraph">У випадку затримки повернення обладнання після закінчення строку оренди, може бути застосована додаткова плата за кожну додаткову годину затримки.</p>


      </div>

      <div className='agreement__statement'>
        <p className="agreement__paragraph">
          Ці умови призначені для забезпечення якості та безпеки обладнання під час його оренди.
        </p>
        
        <p className="agreement__paragraph">
          Будь ласка, дотримуйтеся цих правил для нашого спільного комфорту.
        </p>
      </div>

      <h3 className='agreement__questions'>Залишились питання?</h3>

      <NavLink
        className='agreement__button1'
        to="/contacts"
      >
        Поставити питання менеджеру
      </NavLink>

      <NavLink
        className='agreement__button2'
        to="/shopping-cart"
      >
        Зрозуміло, забронювати!
      </NavLink>


    </div>
  );
}
