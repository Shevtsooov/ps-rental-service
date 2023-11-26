import React, { useEffect, useRef, useState } from 'react';
import './ShoppingCart.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';
import { PSShoppingCartInfo } from '../../components/PSShoppingCartInfo/PSShoppingCartInfo';
import { Delivery } from '../../components/Delivery/Delivery';
import { closeCalendar } from '../../Redux/Slices/isCalendarShown.slice';
import { closeDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { resetChosenDelivery, setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useAddNewOrderMutation, useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { setSavedAddress } from '../../Redux/Slices/savedAddress.slice';
import { Loader } from '../../components/Loader/Loader';
import { resetUserComment, setUserComment } from '../../Redux/Slices/userComment.slice';
import { resetBookedDays } from '../../Redux/Slices/bookedDays.slice';
import { useEditUserMutation } from '../../Redux/RTK_Query/users.service';

export const ShoppingCart: React.FC = () => {
  const {data: allTheOrders, refetch } = useGetAllOrdersQuery();
  const [ editUser ] = useEditUserMutation();

  const user = useAppSelector(state => state.user.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const isCalendarShown = useAppSelector(state => state.isCalendarShown.value);
  const isDeliveryShown = useAppSelector(state => state.isDeliveryShown.value);
  const chosenDelivery = useAppSelector(state => state.chosenDelivery.value);
  const savedAddress = useAppSelector(state => state.savedAddress.value);
  const userComment = useAppSelector(state => state.userComment.value);
  const [isCommentShown, setIsCommentShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const [finalPrice, setFinalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [ makeNewOrder, isSuccess ] = useAddNewOrderMutation();

  // THIS BLOCK ENSURES THE PAGE OPENS FROM THE TOP
  const topContainer = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    topContainer.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    if (user && savedAddress === '') {
      dispatch(setSavedAddress(user?.address));
    }
  }, [user]);

  const [selectedDelivery, setSelectedDelivery] = useState<string>(() => {
    const storedDelivery = sessionStorage.getItem('storedDelivery');
    const parsedDelivery = storedDelivery ? JSON.parse(storedDelivery) : '';
    
    if (parsedDelivery.length !== '') {
      return parsedDelivery;
    }
    
    return '';
  });

  useEffect(() => {
    sessionStorage.setItem("storedDelivery", JSON.stringify(selectedDelivery));
  }, [selectedDelivery,]);

  useEffect(() => {
    dispatch(resetChosenDelivery());
    dispatch(setChosenDelivery(selectedDelivery))
  }, [selectedDelivery, dispatch]);

  useEffect(() => {
    if (user) {
      const gamesPrice = (user?.cartGames?.length - 1) * 100;
  
      let psPricePerDay = 450;
    
      if (bookedDays.length > 2) {
        psPricePerDay = 350; 
      }
    
      if (bookedDays.length > 6) {
        psPricePerDay = 300; 
      }
    
      const deliveryPrice = chosenDelivery === 'Доставка'
        ? 100
        : 0;
  
      const finalPriceCalc = user?.cartGames.length
      ? deliveryPrice + (psPricePerDay * bookedDays.length) + gamesPrice
      : deliveryPrice + (psPricePerDay * bookedDays.length);
  
      setFinalPrice(finalPriceCalc);
    }
  }, [bookedDays, user, chosenDelivery]);

  const handleToggleCalendar = () => {
    dispatch(closeCalendar());
    dispatch(closeDelivery());
  };

  const handleShowComment = () => {
    setIsCommentShown(true);
  };

  const handleHideComment = () => {
    setIsCommentShown(false);
    dispatch(resetUserComment());
  };

  const handleAddComment = (comment: string) => {
    dispatch(setUserComment(comment));
  };

  const handleClearComment = () => {
    dispatch(resetUserComment());
  };

  useEffect(() => {
    if (!refreshTokenService.get() ) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0, left: 0,
      });

      setTimeout(() => (
        document.body.style.overflow = 'auto'
      ), 4000);

      return;
    }
  }, [isLoading]);

  const handleSubmit = async () => {
    const days = bookedDays.map(day => (
      day.toString().slice(4, 15))
    );

    console.log('started');

    try {
      setIsLoading(true);

      await makeNewOrder({
        bookedDays: days,
        orderedGames: user?.cartGames,
        deliveryOption: chosenDelivery,
        deliveryAddress: savedAddress || user?.address,
        userId: user?.id,
        orderStatus: 'В обробці',
        sumOfOrder: finalPrice,
        adminComment: 'Це тестовий коментар від адміна відносно цього замовлення',
        userComment,
        isArchived: false,
      })
    
      console.log('is here');

      if (isSuccess) {
        setIsResult(true);
        sessionStorage.clear()
        dispatch(resetBookedDays());
        await editUser({
          id: user?.id,
          cartGames: [],
        });
        
        setTimeout(() => {
          setIsResult(false);
          navigate('/');
        }, 4000);

        refetch();
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {isResult && (
      <div
        className='shoppingCart__modal'
      >
        <h4>Ваше замовлення прийнято</h4>
        <p>Очікуйте email з підтвердженням</p>
        <p>Скоро з вами зв'яжеться менеджер</p>
      </div>
    )}

    {isLoading
      ?  (
        <div className='shoppingCart__loader'>
          <Loader />
        </div>
      )
      : (
        <>
        <div
          className="shoppingCart"
          // ref={topContainer}
        >

            {(isCalendarShown || isDeliveryShown) && (
              <div
                className="shoppingCart__modal_bg"
                onClick={handleToggleCalendar}
              />
            )}

          <h1 className='shoppingCart__title'>Кошик</h1>
          <p
            className='shoppingCart__amount'
          >
            {`Кількість ігор: ${
              user?.cartGames
                ? user?.cartGames.length
                : 'обрахування...'
              }`}
          </p>

          {user?.cartGames.length
          ? <ShoppingCartList />
          : (
            <div className="shoppingCart__empty_list">
              <h4 className="shoppingCart__empty_list_heading">
                Ти ще не обрав жодної гри
              </h4>

              <button className="shoppingCart__empty_list_button">
                <Link
                  to="/games"
                  className="shoppingCart__empty_list_button--link"
                >
                  До списку ігор
                </Link>
              </button>
            </div>
          )}

          <PSShoppingCartInfo />
          
          <Delivery />

          {!isCommentShown && userComment === '' && (
            <button
              className='shoppingCart__userComment'
              onClick={handleShowComment}
            >
              Додати коментар
            </button>
          )}


          {(isCommentShown || userComment !== '') && (
            <div className='shoppingCart__comment'>
              <h5 className='shoppingCart__comment_title'>Коментар:</h5>
              <textarea
                className='shoppingCart__comment_input'
                value={userComment}
                onChange={(e) => handleAddComment(e.target.value)}
              />
            {userComment !== '' && (
              <button
                className='shoppingCart__comment--clear'
                onClick={handleClearComment}
              />
            )}
              <button
                className='shoppingCart__comment--hide'
                onClick={handleHideComment}
              >
                Видалити коментар
              </button>
            </div>
          )}

          {user && (bookedDays.length > 0 || user?.cartGames?.length > 1) && (
            <div className="shoppingCart__finalPrice">
              <h5 className="shoppingCart__finalPrice_title">
                Загальна вартість:
              </h5>
              <p className="shoppingCart__finalPrice_amount">
                {`${finalPrice}₴`}
              </p>
            </div>
          )}

          <div className="shoppingCart__checkout">
            <button
              className="shoppingCart__checkout_button"
              onClick={handleSubmit}
            >
              Оформити прокат
            </button>
          </div>
        
        </div>
        </>
      ) 
    }
    </>
    
    
  );
}
