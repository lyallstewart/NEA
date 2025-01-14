// Context provides a means of accessing data from any component, regardless of its location in the tree.
import { createContext } from "react";

/* Stores the currently logged-in user, and a subset of their account information */
export const UserContext = createContext({});

/*
- Stores the currently logged-in user (for cross-checking with the user state, to check they're both in sync post-auth
operations), a list of clubs of which the user is a member, and a list of other clubs
- This is likely to become rather large, so will need memoisation (https://react.dev/reference/react/memo) to optimise
loading.
*/
export const ClubsContext = createContext({});

/* Stores (generated on admin views) all bookings and possibly bookable slots. */
export const BookingsContext = createContext({});

/* Stores all rooms */
export const RoomsContext = createContext({});
