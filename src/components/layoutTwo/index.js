import React, { useEffect } from "react";
import ProfilePane from "../../components/Profile-pane";
import Sidebar from "../../components/Sidebar";
import Upct from "../../components/Upct-details";
import PopularTags from "../../components/PopularTags";
import { useDispatch, useSelector } from "react-redux";
import {
  userTotal,
  postTotal,
  tagTotal,
  commentTotal,
} from "../../Features/upctTotal";
import useFetch from "../../useFetch";

const LayoutTwo = ({ children }) => {
  // Getting a list of 100 users from the api
  const { userData: tusers } = useFetch("https://dummyapi.io/data/v1/user");

  // Getting the total posts from the api
  const { userData: tpost } = useFetch("https://dummyapi.io/data/v1/post");

  // Getting the total comments from the api
  const { userData: tcomment } = useFetch(
    "https://dummyapi.io/data/v1/comment"
  );

  // Getting the total Tags from the api
  const { userData: ttag } = useFetch("https://dummyapi.io/data/v1/tag");

  const dispatch = useDispatch();

  const totUsers = useSelector((state) => state.total.userValue);
  const totPosts = useSelector((state) => state.total.postValue);
  const totComments = useSelector((state) => state.total.commentValue);
  const totTags = useSelector((state) => state.total.tagValue);

  useEffect(() => {
    tusers && dispatch(userTotal(tusers.total));
    tpost && dispatch(postTotal(tpost.total));
    tcomment && dispatch(commentTotal(tcomment.total));
    ttag && dispatch(tagTotal(ttag.data.length));
  }, [tusers]);

  return (
    <div className="h-screen flex mx-auto w-[90rem] overflow-hidden bg-gray-50">
      <div className="h-[100%]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="left-0">
          <ProfilePane />
        </div>
        <div className="w-full mt-12 p-6 overflow-auto">
          {/* The popular Tags and UCPT(User, Comment, Posts, Tags) information */}
          <div className="flex items-center justify-between flex-1 h-64">
            {/* The UCPT information */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {tusers && <Upct headline={"Users"} digits={totUsers} />}
              {tpost && <Upct headline={"Posts"} digits={totPosts} />}
              {tcomment && <Upct headline={"Comments"} digits={totComments} />}
              {ttag && <Upct headline={"Tags"} digits={totTags} />}
            </div>

            {/* The popular Tags */}
            <PopularTags ttag={ttag} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutTwo;
