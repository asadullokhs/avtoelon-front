import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defImage from "../../images/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg";
import Loading from "../../components/Loading/Loading";
import "./CarDetailPage.css";
import { getOne } from "../../api/carRequests";
import {  addComment, updateComment, deleteComment } from "../../api/commentRequests";
import { getOne as getUser } from "../../api/userRequests";
import { useInfoContext } from "../../context/Context";
import { toast } from "react-toastify";

const CarDetailPage = () => {
  const { id } = useParams();
  const {currentUser} = useInfoContext();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [user, setUser] = useState(null);
  const [commentsWithAuthors, setCommentsWithAuthors] = useState([]);


  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getOne(id);
        setCar(response.data.car[0]);
        fetchCommentAuthors(response.data.car[0].comments);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await getUser(currentUser._id);
        setUser(response.data.user[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchCommentAuthors = async (comments) => {
      try {
        const commentsWithAuthors = await Promise.all(
          comments.map(async (comment) => {
            const authorResponse = await getUser(comment.authorId);
            return {
              ...comment,
              author: authorResponse.data.user,
            };
          })
        );
        setCommentsWithAuthors(commentsWithAuthors);
      } catch (error) {
        console.error("Error fetching comment authors:", error);
      }
    };

    fetchCar();
    fetchUser();
  }, [id, toast]);

  const handleAddComment = async () => {
    toast.loading("Please wait...")
    if (newComment.trim() === "" || !user) return;

    const commentData = {
      content: newComment,
      carId: id,
      authorId: user._id,
    };

    try {
      const response = await addComment(commentData);
      const newCommentWithAuthor = {
        ...response.data.newComment,
        author: user,
      };
      setCommentsWithAuthors([...commentsWithAuthors, newCommentWithAuthor]);
      setNewComment("");
      toast.dismiss();
      toast.success("Added successfully!")
    } catch (error) {
      toast.dismiss();
      toast.error(error)
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateComment = async () => {
    toast.loading("Please wait...")
    if (editingComment.content.trim() === "") return;

    try {
      const response = await updateComment(editingComment._id, {
        content: editingComment.content,
      });
      setCommentsWithAuthors(
        commentsWithAuthors.map((comment) =>
          comment._id === editingComment._id
            ? { ...comment, content: response.data.comments.content }
            : comment
        )
      );
      setEditingComment(null);
      toast.dismiss();
      toast.success("Successfully updated!")
    } catch (error) {
      toast.dismiss();
      toast.error(error)
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
     toast.loading('Please wait...')
      await deleteComment(commentId);
      setCommentsWithAuthors(
        commentsWithAuthors.filter((comment) => comment._id !== commentId)
      );
      toast.dismiss();
      toast.success("Deleted successfully!")
    } catch (error) {
        toast.dismiss();
        toast.error(error)
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="one_loading-container">
        <Loading />
      </div>
    );
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  const { title, year, price, location, description, image, author } = car;

  return (
    <div className="one_car-detail-page">
      <div className="one_car-header">
        <div className="one_car-image-container">
          <img
            src={image?.url || defImage}
            alt={title}
            className="one_car-image"
          />
        </div>
        <div className="one_car-info">
          <h1 className="one_car-title">{title}</h1>
          <div className="one_car-meta">
            <span className="one_car-year">{year}</span>
            <span className="one_car-price">${price}</span>
            <span className="one_car-location">{location}</span>
          </div>
          <p className="one_car-description">{description}</p>
          <div className="one_car-author">
            <img
              src={author?.avatar?.url || defImage}
              alt={`${author.firstname} ${author.lastname}`}
              className="one_author-avatar"
            />
            <div className="one_author-info">
              <p className="one_author-name">
                {author.firstname} {author.lastname}
              </p>
              <p className="one_author-email">{author.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="one_car-comments">
        <h2>Comments</h2>
        {commentsWithAuthors.length > 0 ? (
          commentsWithAuthors.map((comment) => (
            <div key={comment._id} className="one_comment">
              <p>{comment.content}</p>
              <div className="one_comment-author">
                <img
                  src={comment.author[0]?.avatar?.url || comment.author?.avatar?.url || defImage}
                  alt={`${comment.author[0]?.firstname || comment.author?.firstname} ${comment.author[0]?.lastname|| comment.author?.lastname}`}
                  className="one_comment-author-avatar"
                />
                <p className="one_comment-author-name">
                  Author: {comment.author[0]?.firstname || comment.author?.firstname} {comment.author[0]?.lastname|| comment.author?.lastname}
                </p>
              </div>
              {user && comment.authorId === user._id && (
                <div className="one_comment-actions">
                  <button onClick={() => setEditingComment(comment)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        {editingComment ? (
          <div className="one_comment-edit-form">
            <textarea
              value={editingComment.content}
              onChange={(e) =>
                setEditingComment({
                  ...editingComment,
                  content: e.target.value,
                })
              }
            />
            <button onClick={handleUpdateComment}>Update Comment</button>
            <button onClick={() => setEditingComment(null)}>Cancel</button>
          </div>
        ) : (
          <div className="one_comment-form">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Submit Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
