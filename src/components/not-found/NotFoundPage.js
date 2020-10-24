import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function NotFoundPage() {
  const [timeToRedirect, setTimeToRedirect] = useState(3);
  useEffect(() => {
    setTimeout(() => {
      setTimeToRedirect((prevTime) => prevTime - 1);
      if (timeToRedirect === 0) return;
    }, 1000);
  }, [timeToRedirect]);
  return (
    <>
      <h2>Oops! There&#39;s nothing here</h2>
      <h4>Redirecting in {timeToRedirect}...</h4>
      {timeToRedirect === 0 && <Redirect to="/" />}
    </>
  );
}

export default NotFoundPage;
