// import React, { useState, useEffect, useRef } from 'react';

// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const loader = useRef(null);

//   const fetchPosts = async () => {
//     setLoading(true);
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
//     const data = await res.json();
//     setPosts((prev) => [...prev, ...data]);
//     setPage((prev) => prev + 1);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting && !loading) {
//           fetchPosts();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loader.current) observer.observe(loader.current);
//     return () => {
//       if (loader.current) observer.unobserve(loader.current);
//     };
//   }, [loading]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>📜 Infinite Scroll Posts</h2>

//       {posts.map((post) => (
//         <div
//           key={post.id}
//           style={{
//             margin: '10px 0',
//             padding: '15px',
//             background: '#f0f0f0',
//             borderRadius: '5px',
//           }}
//         >
//           <h4>{post.title}</h4>
//           <p>{post.body}</p>
//         </div>
//       ))}

//       <div  className='bg-green-700 w-full ' ref={loader} style={{ padding: '20px', textAlign: 'center' }}>
//         {loading ? '🔄 Loading more...' : '⬇️ Scroll down to load more'}
//       </div>
//     </div>
//   );
// };

// export default App;

// components/PostsList.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// // import { fetchPosts } from '../services/api';
// // services/api.js
// export const fetchPosts = async (page, limit) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
//   const data = await res.json();
//   return data;
// };


// const PostsList = () => {
//   const [posts, setPosts] = useState([]);     // store all fetched posts
//   const [page, setPage] = useState(1);        // current page number
//   const [loading, setLoading] = useState(false); // prevent overlapping requests

//   const observer = useRef(); // hold our IntersectionObserver

//   // 🧲 Callback ref that sets observer on the last post
//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loading) return; // don't observe during loading
//       if (observer.current) observer.current.disconnect(); // clear previous observer

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prev) => prev + 1); // load next page
//         }
//       });

//       if (node) observer.current.observe(node); // start observing
//     },
//     [loading]
//   );

//   // 🔁 Fetch data when page changes
//   useEffect(() => {
//     const loadMore = async () => {
//       setLoading(true);
//       const newPosts = await fetchPosts(page, 10);
//       setPosts((prev) => [...prev, ...newPosts]);
//       setLoading(false);
//     };
//     loadMore();
//   }, [page]);

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
//       <h1 style={{ textAlign: 'center' }}>📰 Infinite Feed</h1>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {posts.map((post, index) => {
//           if (posts.length === index + 1) {
//             // Attach observer to last item
//             return (
//               <li
//                 key={post.id}
//                 ref={lastPostElementRef}
//                 style={styles.card}
//               >
//                 <h3>{post.title}</h3>
//                 <p>{post.body}</p>
//               </li>
//             );
//           } else {
//             return (
//               <li key={post.id} style={styles.card}>
//                 <h3>{post.title}</h3>
//                 <p>{post.body}</p>
//               </li>
//             );
//           }
//         })}
//       </ul>
//       {loading && <p style={{ textAlign: 'center' }}>🔄 Loading more posts...</p>}
//     </div>
//   );
// };

// const styles = {
//   card: {
//     margin: '15px 0',
//     padding: '15px',
//     background: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//   },
// };

// export default PostsList;
