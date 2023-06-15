import React, { useState, useEffect } from "react";
import { useAccountComment } from "@plebbit/plebbit-react-hooks";
import useStateString from "../hooks/useStateString";

const PendingLabel = ({ commentIndex }) => {
  const comment = useAccountComment({commentIndex: commentIndex});
  const stateString = useStateString(comment);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (commentIndex === undefined) return null;
  
  return (
    comment.cid ? (
      <span>{comment.cid.slice(2, 14)}</span>
    ) : (
      (comment.state === "failed" || (stateString === undefined && !isLoading)) ? (
        <span style={{color: 'red', fontWeight: '700'}}>
          Failed
        </span>
      ) : (
        <span style={{color: 'red', fontWeight: '700'}}>
          Pending
        </span>
      )
    )
  );
};

export default PendingLabel;