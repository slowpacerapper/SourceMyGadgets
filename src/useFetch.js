import { useEffect, useState } from "react";
import axios from "axios";

export const idKey = "628ee8d87705e52d617ec7ed";

const useFetch = (url) => {
  const [userData, setUserData] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [singleUserComment, setSingleUserComment] = useState();
  const [singleUserPost, setSingleUserPost] = useState();
  const [singleUserTag, setSingleUserTag] = useState();
  const [delData, setDelData] = useState();
  const [appID, setappID] = useState("628ee8d87705e52d617ec7ed");

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          "app-id": appID,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, appID]);

  // function for getting information of a user in the database
  const forApiCallsWithId = (idValue) => {
    setLoading(true);
    axios
      .get(`${url}/${idValue}`, {
        headers: {
          "app-id": appID,
        },
      })
      .then((res) => setSingleData(res.data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`${url}/${idValue}/comment`, {
        headers: {
          "app-id": appID,
        },
      })
      .then((res) => setSingleUserComment(res.data.total))
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${url}/${idValue}/post`, {
        headers: {
          "app-id": appID,
        },
      })
      .then((res) => setSingleUserPost(res.data.total))
      .catch((err) => {
        console.log(err);
      });
  };

  // function to delete a user from the database
  const deleteUser = (idValue) => {
    axios
      .delete(`${url}/${idValue}`, {
        headers: {
          "app-id": appID,
        },
      })
      .then((res) => console.log(res.status))
      .catch((err) => {
        setError(err);
      });
  };

  return {
    userData,
    singleData,
    singleUserComment,
    singleUserPost,
    singleUserTag,
    delData,
    loading,
    error,
    forApiCallsWithId,
    deleteUser,
  };
};

export default useFetch;
