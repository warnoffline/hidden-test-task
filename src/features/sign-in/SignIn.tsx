import { PasswordInput, Button, TextInput, Loader, Text } from "@mantine/core";
import styles from "./SignIn.module.scss";
import { motion } from "framer-motion";
import { useForm } from "@mantine/form";
import { AuthParams } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { auth } from "@/entities/Auth/actions";
import { useNavigate } from "react-router-dom";
import { listOfUsersSession } from "@/entities/Auth/actions";

export function SignIn({
  setSign,
}: {
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: AuthParams) => {
    await dispatch(auth(data));
    await dispatch(listOfUsersSession());
    navigate("/dashboard");
    form.reset();
  };
  const form = useForm<AuthParams>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный адрес почты",
      password: (value) => (value.length === 0 ? "Пустая строка" : null),
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
      className={styles["auth-form"]}
    >
      <motion.div
        initial={{ translateX: "100%" }}
        animate={{ translateX: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 25,
        }}
        className={styles["auth-form__aside"]}
      >
        <div className={styles["auth-form__aside--text"]}>
          <span>Добро пожаловать обратно!</span>
        </div>
      </motion.div>
      {isLoading ? (
        <div className={styles["auth-form__loader"]}>
          <Loader size="xl" color="#3182CE" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ translateY: "0", opacity: 1 }}
          transition={{
            type: "spring",
            damping: 25,
          }}
          className={styles["auth-form__body"]}
        >
          <div className={styles["auth-form__body--header"]}>
            <span>Вход</span>
          </div>
          <div className={styles["auth-form__body--input"]}>
            <Text color="red">{error}</Text>
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
          </div>
          <div className={styles["auth-form__body--footer"]}>
            <Button type="submit" size="md" w="100%" color="#3182CE">
              Войти
            </Button>
            <span className={styles["auth-form__body--footer-text"]}>
              Ещё нет аккаунта?{" "}
              <button onClick={() => setSign(false)}>Регистрация</button>
            </span>
          </div>
        </motion.div>
      )}
    </form>
  );
}
