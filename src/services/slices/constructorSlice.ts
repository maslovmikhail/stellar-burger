import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient } from '@utils-types';

const randomId = () => self.crypto.randomUUID();

type TBurgerConstructorSliceState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
};

const initialState: TBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    ingredientsToUp: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },
    ingredientsToDown: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[payload + 1];

      state.constructorItems.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.isIngredientsLoading = false;
    }
  },
  selectors: {
    selectConstructorBurger: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { selectConstructorBurger } = burgerConstructorSlice.selectors;
export const {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
