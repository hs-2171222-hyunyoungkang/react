import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, where, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import './PostView.css';
import { useNavigate } from 'react-router-dom';
import whiteheart from '../img/whiteheart.png'
import { Card,Input, } from 'antd';
import heart from '../img/blueheart.png'

const { TextArea } = Input;
const PostView = ({ history }) => {
  const { idx } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const postData = location.state.data;
  console.log(postData);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, 'posts', idx);
        const postSnap = await getDoc(postRef);
  
        if (postSnap.exists()) {
          setData(postSnap.data());
        } else {
          setData(null);
        }
  
        // 해당 게시글의 댓글만 가져오기
        const commentsQuery = query(
          collection(db, 'comments'),
          where('postId', '==', postData?(postData[idx].id) : "없습니다"), // postId로 필터링
          orderBy('createdAt', 'asc')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
  
        const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
  
        // postId가 일치하는 댓글만 선택
        const filteredComments = commentsData.filter(comment => comment.postId === postData?(postData[idx].id): "없습니다");
  
        setComments(filteredComments);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
  
    fetchPostData();
  }, [idx, location, postData]);
  console.log(postData);

  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) {
      return;
    }

    const now = new Date();
    const commentData = {
      postId: postId,
      content: newComment,
      createdAt: now,
    };

    console.log(commentData);

    try {
      // 댓글 추가
      await addDoc(collection(db, 'comments'), commentData);

      // 댓글 목록 업데이트
      setComments([...comments, commentData]);

      // 새 댓글 입력값 초기화
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  return (
    <>
    <div className="post-view-wrapper">
        {postData ? (
          <>
            <img src={whiteheart} alt={whiteheart}></img> 익명
            <div className="post-view-row">
              
              <label>{postData[idx].createAt}</label>
            </div>
            <div className="post-view-title">
              
              <label>{postData[idx].title}</label>
            </div>
            
            <div className="post-view-row">
              
              <div dangerouslySetInnerHTML={{ __html: postData[idx].content }} />
            </div>

            <div className="post-view-row">

            <TextArea 
            showCount maxLength={100}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요" />
            <img src={heart} onClick={() =>handleCommentSubmit(postData[idx].id)}></img>
            </div>

            <div className="post-view-row">
            <div className="comment-container">
              <ul>
                {comments.map((comment, index) => (
                 <p>{comment.content}</p>
                ))}
              </ul>
            </div>
            </div>

          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}
        <button className="post-view-go-list-btn" onClick={() => navigate('/ComputerProgramming')}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default PostView;




