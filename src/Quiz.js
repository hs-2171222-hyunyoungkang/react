
import React, { useState, useEffect } from 'react';
import { doc, collection, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const problemsData = [
  { id: 1, question: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오' },
  { id: 2, question: 'N을 입력받은 뒤, 구구단 N단을 출력하는 프로그램을 작성하시오.' },
  { id: 3, question: 'N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.' },
  { id: 4, question: '시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.' },
  { id: 5, question: '알파벳으로만 이루어진 단어를 입력받아, 그 길이를 출력하는 프로그램을 작성하시오.' },
];

const App = () => {
  const [randomProblem, setRandomProblem] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * problemsData.length);
    setRandomProblem(problemsData[randomIndex]);

    const commentsRef = collection(db, 'comments');
    onSnapshot(commentsRef, (snapshot) => {
      const commentsData = [];
      snapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsData);
    });
  }, []);

  const handleCommentSubmit = async () => {
    if (comment.trim() !== '') {
      const commentData = {
        text: comment,
      };

      const commentsRef = collection(db, 'comments');
      await addDoc(commentsRef, commentData);

      setComment('');
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  return (
    <div className="App" style={{ width: '400px', margin: 'auto', padding: '30px', fontFamily: 'fantasy', backgroundColor: '#f0f0f0' }}>
      <div className="problem-container" style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1E96FF', fontFamily: 'fantasy', fontSize: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>오늘의 문제</h1><br></br>
        {randomProblem && (
          <div>
            <p>{randomProblem.question}</p>
          </div>
        )}
      </div>

      <div className="comments-section" style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div>
      <input
  type="textarea"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="댓글을 입력하세요"
  style={{
    width: '100%',
    padding: '5px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontFamily: 'Georgia'
  }}
/>
<button onClick={handleCommentSubmit} style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff' }}>
  댓글 남기기
</button>
            </div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ backgroundColor: '#f9f9f9', padding: '8px', marginBottom: '5px', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ marginRight: '10px', fontFamily: 'Georgia', color: 'black' }}>{comment.text}</p>
              <button onClick={() => handleCommentDelete(comment.id)} style={{ padding: '5px', border: 'none', borderRadius: '5px', backgroundColor: '#ff5a5f', color: '#fff' }}>삭제</button>
            </div>
          ))
        ) : (
          <p style={{ color: 'black', fontFamily: 'Georgia' }}></p>
        )}
      </div>
    </div>

  );
};

export default App;
