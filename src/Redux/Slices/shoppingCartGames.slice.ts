import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../../types/Game';
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ShoppingCartGamesState {
  value: Game[]
}

const initialState: ShoppingCartGamesState = {
  value: [
    {
      "title": "ZOMBI",
      "icon": "default-icon.jpg",
      "gameId": "zombi",
      "poster": "/zombi/zombi.png",
      "description": "ZOMBI - це жахлива гра, де виживання - ваша головна мета, і ви повинні битися з живими мерцями, щоб вижити.",
      "videoReview": "https://www.youtube.com/watch?v=yourvideolink",
      "videoGameplay": "https://www.youtube.com/watch?v=yourvideolink",
      "price": 100,
      "discountedPrice": null,
      "category": ["Жахи", "Екшн"],
      "players": "1",
      "disclaimers": [
        "Битва з живими мерцями у цьому жахливому виживанському хоррорі.",
        "Завжди перевіряйте своє оточення, адже смерть може прийти зі спини.",
        "Гра для справжніх шанувальників жанру жахів та напруги."
      ],
      "releasedOn": "",
      "isAvailable": true,
      "popularity": 0
    },
    {
      "title": "Zombie Army 4: Dead War",
      "icon": "default-icon.jpg",
      "gameId": "zombie-army-4-dead-war",
      "poster": "/zombie-army-4-dead-war/zombie-army-4-dead-war.png",
      "description": "Zombie Army 4: Dead War - це кооперативна гра, де ви і ваші друзі збираєтеся, щоб знищити нацистських зомбі відьомство.",
      "videoReview": "https://www.youtube.com/watch?v=yourvideolink",
      "videoGameplay": "https://www.youtube.com/watch?v=yourvideolink",
      "price": 100,
      "discountedPrice": null,
      "category": ["Жахи", "Екшн"],
      "players": "1-4",
      "disclaimers": [
        "Зомбі-нацисти атакують! Зберіть команду для боротьби проти них.",
        "Покращуйте свої навички та зброю для виживання у жорстокому світі.",
        "Гра для шанувальників кооперативних виживальних шутерів."
      ],
      "releasedOn": "",
      "isAvailable": true,
      "popularity": 0
    },
    {
      "title": "11-11 Memories Retold",
      "icon": "default-icon.jpg",
      "gameId": "11-11-memories-retold",
      "poster": "/11-11-memories-retold/11-11-memories-retold.png",
      "description": "11-11 Memories Retold - це інді-гра, яка розповідає про долю двох різних солдат під час Першої світової війни.",
      "videoReview": "https://www.youtube.com/watch?v=yourvideolink",
      "videoGameplay": "https://www.youtube.com/watch?v=yourvideolink",
      "price": 100,
      "discountedPrice": null,
      "category": ["Пригоди", "Інді"],
      "players": "1",
      "disclaimers": [
        "Подорожуйте крізь часи та історії двох різних солдат.",
        "Ваші рішення впливатимуть на хід подій і кінцевий результат.",
        "Гра для шанувальників глибоких історій та непередбачуваних сюжетів."
      ],
      "releasedOn": "",
      "isAvailable": true,
      "popularity": 0
    },
    {
      "title": "13 Sentinels: Aegis Rim",
      "icon": "default-icon.jpg",
      "gameId": "13-sentinels-aegis-rim",
      "poster": "/13-sentinels-aegis-rim/13-sentinels-aegis-rim.png",
      "description": "13 Sentinels: Aegis Rim - це гра, де ви керуєте 13 різними персонажами і розгадуєте неймовірні загадки та таємниці.",
      "videoReview": "https://www.youtube.com/watch?v=yourvideolink",
      "videoGameplay": "https://www.youtube.com/watch?v=yourvideolink",
      "price": 100,
      "discountedPrice": null,
      "category": ["Пригоди", "Інді"],
      "players": "1",
      "disclaimers": [
        "Вирушайте в епічну подорож разом із 13 різними персонажами.",
        "Розгадайте неймовірні загадки та беріть участь у боях з ворогами.",
        "Гра для шанувальників складних інтриг та інтелектуальних викликів."
      ],
      "releasedOn": "",
      "isAvailable": true,
      "popularity": 0
    }
  ],
}

export const shoppingCartGamesSlice = createSlice({
  name: 'shoppingCartGames',
  initialState,
  reducers: {
    setShoppingCartGames: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterShoppingCartGames: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((game) => game.gameId !== action.payload),
      };
    },
    resetShoppingCartGamess: (state) => {
      state.value = []
    },
  },
})

export const {
  setShoppingCartGames,
  filterShoppingCartGames,
  resetShoppingCartGamess,
} = shoppingCartGamesSlice.actions;
export const shoppingCartGamesReducer = shoppingCartGamesSlice.reducer;
