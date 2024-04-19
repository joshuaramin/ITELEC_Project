import { gql } from "@apollo/client";

export const GetAllCategory = gql`
   query GetAllCategory {
      getAllCategory {
         categoryID
         category
      }
   }
`;
