import React, { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { GetMySubjectCreated } from "../../../../util/Query/subject";
import { DeleteSubject } from "../../../../util/Mutation/course";
import Prompt from "../../../../components/prompt/prompt";
import { DecodedToken } from "../../../../auth/token";

export default function DeleteCard({ styles, id }) {
  const [toggle, setToggle] = useState(false);

  const token = DecodedToken();

  const onCloseToggle = () => {
    setToggle(() => !toggle);
  };

  const variable = {
    subjectId: id,
  };

  const updateCache = (cache, { data }) => {
    const { getMySubjectCreated } = cache.readQuery({
      query: GetMySubjectCreated,
      variables: {
        userId: token,
      },
    });

    cache.writeQuery({
      query: GetMySubjectCreated,
      variables: {
        userId: token,
      },
      data: {
        getMySubjectCreated: getMySubjectCreated.filter((subj) => {
          return subj.subjectID !== data.deleteSubject.subjectID;
        }),
      },
    });
  };
  return (
    <div className={styles.deleteContainer}>
      {toggle ? null : (
        <button
          className={styles.deleteBtn}
          onClick={() => setToggle(() => !toggle)}
        >
          <TbTrash size={26} />
        </button>
      )}
      {toggle ? (
        <div className={styles.prompt}>
          <Prompt
            close={onCloseToggle}
            gql={DeleteSubject}
            variable={variable}
            update={updateCache}
          />
        </div>
      ) : null}
    </div>
  );
}
