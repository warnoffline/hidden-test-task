import { User } from "@/shared/types"
import { getRole } from "./getRole";


export const getUserDetails = (user: User | null) => {
    if(!user){
        return [];
    }
    return [
        { label: "Почта", value: user?.email },
        {
          label: "Почта подтверждена",
          value: user?.email_verified ? "Подтверждена" : "Не подтверждена",
        },
        { label: "Номер телефона", value: user?.phone || "Не добавлен" },
        {
          label: "Номер подтверждена",
          value: user?.phone_verified ? "Подтверждён" : "Не подтверждён",
        },
        {
          label: "Роль",
          value: user?.role_id ? getRole[user?.role_id] : "Неизвестная роль",
        },
      ];
}