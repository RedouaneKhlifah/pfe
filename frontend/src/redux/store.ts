import { Tuple, configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./reducers/matches.reducer";
import playersReducer from "./reducers/Playeres.reducer";
// ...

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    palyers: playersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
