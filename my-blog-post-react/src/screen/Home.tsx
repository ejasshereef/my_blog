import { useNavigate, useParams } from "react-router-dom";
import axiosServer from "../utils/AxiosInstance";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPenToSquare,
  faRecycle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
interface tsPost {
  post_id: number;
  user_id: number;
  user_name: string;
  post_title: string;
  post_description: string;
}
const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateUI, setUpdateUI] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [posts, setPosts] = useState([] as tsPost[]);
  const [newPostText, setNewPostText] = useState({
    id: -1,
    post_title: "",
    post_description: "",
  } as { post_title: string; post_description: string; id: number });

  useEffect(() => {
    const token: string | undefined = Cookies.get("jwt");
    console.log("token", token);

    if (token === undefined) {
      navigate("/login");
    } else {
      fetchSavedPost();
    }
  }, [newPostText, updateUI]);

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  const handleAddPost = async () => {
    try {
      if (
        typeof newPostText?.post_description === "string" &&
        newPostText?.post_description.length > 0 &&
        typeof newPostText?.post_title === "string" &&
        newPostText?.post_title?.length > 0
      ) {
        const response = await axiosServer.post("/create-post", newPostText, {
          withCredentials: true,
        });
        if (response?.status === 200) {
          alert(response?.data?.message);
        }
      }
      setNewPostText({
        id: -1,
        post_title: "",
        post_description: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedPost = async () => {
    try {
      const response = await axiosServer.get("/posts", {
        withCredentials: true,
      });

      const fetchedPost = response?.data?.data;

      if (Array.isArray(fetchedPost) && fetchedPost?.length > 0) {
        setPosts(fetchedPost);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      if (id > 0) {
        const response = await axiosServer.delete(`/posts/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUpdateUI((prev) => !prev);
          alert(response?.data?.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error?.response?.data?.message);

          console.error(
            `Error ${error.response.status}:`,
            error.response.data.message
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleEditPost = (
    id: number,
    post_title: string,
    post_description: string
  ) => {
    setEditPost(true);
    setNewPostText({
      id,
      post_title,
      post_description,
    });
  };

  const handleEditPostApi = async () => {
    try {
      if (
        typeof newPostText?.id === "number" &&
        newPostText?.id > 0 &&
        typeof newPostText?.post_description === "string" &&
        newPostText?.post_description.length > 0 &&
        typeof newPostText?.post_title === "string" &&
        newPostText?.post_title?.length > 0
      ) {
        const response = await axiosServer.put(
          `/posts/${newPostText?.id}`,
          newPostText,
          { withCredentials: true }
        );

        if (response?.status === 200) {
          alert(response?.data?.message);
        }
      }
      setEditPost(false);
      setUpdateUI((prev) => !prev);
      setNewPostText({
        id: -1,
        post_title: "",
        post_description: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error?.response?.data?.message);

          console.error(
            `Error ${error.response.status}:`,
            error.response.data.message
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handlePostDetail = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const fetchPostDetail = async () => {
    try {
      const response = await axiosServer.get(`/posts/${id}`,{withCredentials:true});
      if (response.status === 200) {
        setNewPostText(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RenderPosts = () => {
    return (
      <>
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">My Blog Post</h1>

          <input
            className="w-full p-2 border rounded-md mb-4"
            type="text"
            placeholder="Title"
            value={newPostText?.post_title ? newPostText?.post_title : ""}
            onChange={(e) => {
              const tempVal = e.target.value;

              setNewPostText({
                ...newPostText,
                post_title: tempVal,
              });
            }}
          />
          <textarea
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter your new post"
            rows={7}
            value={
              newPostText?.post_description ? newPostText?.post_description : ""
            }
            onChange={(e) => {
              const tempVal = e.target.value;

              setNewPostText({
                ...newPostText,
                post_description: tempVal,
              });
            }}
          />
          {editPost ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleEditPostApi()}
            >
              Update Post
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleAddPost()}
            >
              Add Post
            </button>
          )}
          <ul className="mt-4">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((item: tsPost) => (
                <li
                  key={item.post_id}
                  className="flex justify-between mb-2 border bg-slate-100 p-5 rounded-md"
                 
                >
                  <div>
                    <h2  onClick={() => handlePostDetail(item?.post_id)} className="text-xl font-bold">{item?.post_title}</h2>
                    <p className="text-gray-500">
                      {item?.post_description.length > 60
                        ? item?.post_description.slice(0, 60) + "..."
                        : item?.post_description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <FontAwesomeIcon
                      onClick={() => handleDeletePost(item?.post_id)}
                      icon={faTrashCan}
                      color="red"
                    />
                    <FontAwesomeIcon
                      onClick={() =>
                        handleEditPost(
                          item?.post_id,
                          item?.post_title,
                          item?.post_description
                        )
                      }
                      icon={faPenToSquare}
                      color="green"
                    />
                  </div>
                </li>
              ))
            ) : (
              <div>
                <h1>Be first to creata new post</h1>
              </div>
            )}
          </ul>
        </div>
      </>
    );
  };

  const RenderPostDetail = () => {
    return (
      <>
        <div className="max-w-3xl mx-auto p-4 border">
          <h1 className="text-3xl font-bold mb-4 text-center">My Post</h1>
          <div className="border-t">
            <div className="flex justify-between mb-2 border bg-slate-100 p-5 rounded-md">
              <div>
                <h2 className="text-xl font-bold">
                  {newPostText?.post_title ? newPostText?.post_title : ""}
                </h2>
                <p className="text-gray-500">
                  {newPostText?.post_description
                    ? newPostText?.post_description
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{id ? RenderPostDetail() : RenderPosts()}</>;
};

export default Home;
