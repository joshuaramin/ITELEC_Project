import React, { useEffect, useState } from "react";
import styles from "./verifcation.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AccountVerification } from "../../util/Mutation/auth";

export default function Verification() {
  const [countDown, setCountDown] = useState(10);

  const router = useNavigate();

  const params = useParams();

  const [mutate] = useMutation(AccountVerification);

  useEffect(() => {
    mutate({
      variables: {
        userId: params.id,
      },
      onCompleted: (data) => {
        console.log(data);
      },
    });
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
      if (countDown === 0) {
        router("/auth/login");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, mutate, params.id, router]);

  return (
    <div className={styles.container}>
      <div className={styles.concon}>
        <h2>Welcome to School Academy</h2>
        <p>
          Your account with School Academy has been successfully verified!
          You're now all set to explore our platform and access a world of
          educational resources. Feel free to log in using your credentials and
          start enjoying the benefits of being part of our learning community.
          Should you have any questions or need assistance, don't hesitate to
          reach out to us at schoolacademy@gmail.com. Thank you for choosing
          School Academy. We look forward to supporting you on your learning
          journey!
        </p>
        <span>Redirecting in {countDown}s</span>
      </div>
    </div>
  );
}
