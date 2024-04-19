import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
export default function CouseTopic() {
   const params = useParams();

   return <div>CouseTopic: {params.topicID}</div>;
}
