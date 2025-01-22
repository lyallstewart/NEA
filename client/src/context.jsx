// Context provides a means of accessing data from any component, regardless of its location in the tree.
import { createContext } from "react";

/* Stores the currently logged-in user, and a subset of their account information */
export const UserContext = createContext({});

/* Stores a list of all clubs and a list of memberships */
export const ClubsContext = createContext({});

/* Stores (generated on admin views) all bookings and bookable slots. */
export const BookingsContext = createContext({});

/* Stores all rooms */
export const RoomsContext = createContext({});
