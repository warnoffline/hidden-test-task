import { TextInput, Button, Loader } from "@mantine/core";
import styles from "./Confirm.module.scss";
import { confirmation } from "@/entities/Registration/actions";
import { resendCode } from "@/entities/Registration/actions";
import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useEffect, useState } from "react";
import { ConfirmParams } from "@/shared/types";
export function Confirm({
  setSign,
  setConfirm,
}: {
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const email = localStorage.getItem("email");
  const { isLoading, confError, resendError } = useAppSelector(
    (state) => state.registrationReducer
  );
  const dispatch = useAppDispatch();
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const handleResendCode = async () => {
    if (email) {
      await dispatch(resendCode(email));
      setResendDisabled(true);
      setResendTimer(60);
    }
  };
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (resendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendDisabled]);

  useEffect(() => {
    if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendTimer]);
  const form = useForm<ConfirmParams>({
    initialValues: {
      confirmation_code: "",
    },
    validate: {
      confirmation_code: (value) => (value === "" ? "Пустая строка" : null),
    },
  });
  const handleConfirmSubmit = async (value: ConfirmParams) => {
    const response = await dispatch(confirmation(value.confirmation_code));
    if(response.meta.requestStatus === 'fulfilled'){
      setSign(true)
      setConfirm(false)
    }
  };
  return (
    <form
      onSubmit={form.onSubmit((value) => handleConfirmSubmit(value))}
      className={styles["confirm-form"]}
    >
      {isLoading ? (
        <div className={styles["confirm-form__loader"]}>
          <Loader size="xl" color="#3182CE" />
        </div>
      ) : (
        <div className={styles["confirm-form__body"]}>
          <div className={styles["confirm-form__body--header"]}>
            <span>Подтверждение кода</span>
          </div>
          <TextInput
            label="Код из письма"
            placeholder="Введите код"
            key={form.key("confirmation_code")}
            {...form.getInputProps("confirmation_code")}
            error={confError}
          />
          <div className={styles["confirm-form__body--buttons"]}>
            <Button type="submit" color="#3182CE">
              Отправить
            </Button>
            <Button
              disabled={resendDisabled}
              onClick={() => handleResendCode()}
              variant="outline"
              color={resendError !== "" ? "red" : ""}
            >
              {resendDisabled
                ? `Отправить повторно ${resendTimer} сек.`
                : resendError !== ""
                ? resendError
                : "Отправить повторно"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
