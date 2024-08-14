import React from "react";
import { logout } from "@/entities/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Button, Divider, Avatar, Loader } from "@mantine/core";
import styles from "./Dashboard.module.scss";
import { useEffect } from "react";
import { getUserById } from "@/entities/User/actions";
import { getUserDetails } from "./lib/getUserDetails";
export function Dashboard() {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.authReducer);
  const { user, isLoading } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId, dispatch]);
  const handleExit = () => {
    dispatch(logout());
  };
  return (
    <div className={styles["dashboard"]}>
      {isLoading ? (
        <div className={styles["dashboard__loader"]}>
          <Loader size="xl" />
        </div>
      ) : (
        <div className={styles["dashboard__body"]}>
          <div className={styles["dashboard__body--avatar"]}>
            <Avatar
              display={isLoading ? "none" : "block"}
              size="60px"
              radius="xl"
            />
          </div>
          <div className={styles["dashboard__body__user-block"]}>
            {getUserDetails(user).map((userDetail) => (
              <React.Fragment key={userDetail.label}>
                <div className={styles["dashboard__body__user-info"]}>
                  <p className={styles["dashboard__body__user-info--label"]}>
                    {userDetail.label}
                  </p>
                  <p className={styles["dashboard__body__user-info--value"]}>
                    {userDetail.value}
                  </p>
                </div>
                <Divider my="md"></Divider>
              </React.Fragment>
            ))}
          </div>
          <div className={styles["dashboard__body__footer"]}>
            <Button color="red" size="md" onClick={() => handleExit()}>
              Выйти
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
