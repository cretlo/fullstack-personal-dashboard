import { AlertData } from "../types";

export type ACTIONTYPE =
  | { type: "set_alert"; payload: AlertData }
  | { type: "remove_alert"; payload: string };

export function alertReducer(alerts: AlertData[], action: ACTIONTYPE) {
  switch (action.type) {
    case "set_alert": {
      return [...alerts, action.payload];
    }
    case "remove_alert": {
      return alerts.filter((alert) => alert.id !== action.payload);
    }
    default: {
      throw new Error();
    }
  }
}
