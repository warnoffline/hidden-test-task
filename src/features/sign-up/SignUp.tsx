import { RegParams } from "@/shared/types";
import styles from "./SignUp.module.scss";
import { PasswordInput, Button, TextInput, Loader,Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { registration } from "@/entities/Registration/actions";
import { useEffect, useState } from "react";
import { Confirm } from "../confirm/Confirm";
export function SignUp({
  setSign,
}: {
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { regError, isLoading } = useAppSelector(
    (state) => state.registrationReducer
  );
  const form = useForm<RegParams>({
    initialValues: {
      email: "",
      password: "",
      repeat_password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный адрес почты",
      password: (value) =>
        value.length < 6 ? "Пароль должен содержать более 6 символов" : null,
      repeat_password: (value, values) =>
        value !== values.password ? "Пароли не совпадают" : null,
    },
  });
  const handleSubmit = async (data: RegParams) => {
    const response = await dispatch(registration(data));
    if(response.meta.requestStatus === 'fulfilled'){
      setIsConfirm(true);
    }
    localStorage.setItem("email", data.email);
    form.reset();
  };
  useEffect(() => {
    if (regError) {
      console.error("Ошибка регистрации:", regError);
    }
  }, [regError, setSign]);
  return (
    <div className={styles["reg-block"]}>
      {isLoading ? (
        <div className={styles["reg-form__loader"]}>
          <Loader size="xl" color="#3182CE" />
        </div>
      ) : isConfirm ? (
        <Confirm setSign={setSign} setConfirm={setIsConfirm} />
      ) : (
        <form
          className={styles["reg-form"]}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ translateY: "0", opacity: 1 }}
            transition={{
              type: "spring",
              damping: 25,
            }}
            className={styles["reg-form__body"]}
          >
            <div className={styles["reg-form__body--header"]}>
              <span>Регистрация</span>
            </div>
            <div className={styles["reg-form__body--input"]}>
              <Text color="red">{regError}</Text>
              <TextInput
                size="md"
                label="Почта"
                placeholder="Введите почту"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                size="md"
                label="Пароль"
                placeholder="Введите пароль"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                size="md"
                label="Повторите пароль"
                placeholder="Введите пароль"
                key={form.key("repeat_password")}
                {...form.getInputProps("repeat_password")}
              />
            </div>
            <div className={styles["reg-form__body--footer"]}>
              <Button type="submit" size="md" w="100%" color="#3182CE">
                Создать аккаунт
              </Button>
              <span className={styles["reg-form__body--footer-text"]}>
                Уже есть аккаунт?{" "}
                <button onClick={() => setSign(true)}>Вход</button>
              </span>
            </div>
          </motion.div>
        </form>
      )}
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 25,
        }}
        className={styles["reg-form__aside"]}
      >
        <div className={styles["reg-form__aside--text"]}>
          <span>Добро пожаловать на сайт!</span>
        </div>
      </motion.div>
    </div>
  );
}
