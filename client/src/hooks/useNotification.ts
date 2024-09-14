import { nanoid } from "nanoid";
import { create } from "zustand";

export type NotificationType = {
  id?: string;
  message: string;
  type: "success" | "error" | "warning";
  duration?: number;
};

type Loading = {
  notifications: NotificationType[];
  addNotification: (notification: NotificationType) => void;
  dismissNotification: (id: string) => void;
  dismissAllNotification: () => void;
};

export const useNotification = create<Loading>((set) => ({
  notifications: [],

  addNotification: (notification: NotificationType) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: nanoid(10), duration: 3000 },
      ],
    })),

  dismissNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),

  dismissAllNotification: () => {
    set(() => ({
      notifications: [],
    }));
  },
}));
