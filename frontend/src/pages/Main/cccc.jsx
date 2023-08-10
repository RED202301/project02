// import React, { useState } from 'react';
// import './cccc.scss'

// const Card = () => {
// //   const { web_raw, twitter_raw, twitter, email, tel, web } = this.props;

//   const [flipped, setFlipped] = useState(false);
//   const [moved, setMoved] = useState(0);

//   const handleClick = () => {
//     // Toggle the class name of the card.
//     setFlipped(!flipped);
//     setMoved(0);
//   };

//   const interval = setInterval(() => {
//     const moved = setMoved ? 0 : 10;
//     document.getElementsByClassName('card')[0].style.transform = 'translateY(' + moved + 'px)';
//   }, 1500);

//   return (
//       <div className="card-wrapper">
//       <div
//         className="card"
//         data-toggle-class="flipped"
//         onClick={handleClick}
//       >
//         <div className='card-front'>
//           <div className="layer">
//             <h1>방 만들기</h1>
//             <div className='corner'></div>
//             <div className='corner'></div>
//             <div className='corner'></div>
//             <div className='corner'></div>
//           </div>
//         </div>
//         <div className={flipped ? "card-front" : 'card-back'}>
//           <div className="layer">
//             <div className="top">
//               <h2>Chief Idea Officer</h2>
//             </div>
//             <div className="bottom">
//               <h3>
//                 Phone:
//                 <a href="tel:#{tel}">#{}</a>
//               </h3>
//               <h3>
//                 Email:
//                 <a href="mailto:#{email}">#{}</a>
//               </h3>
//               <h3>
//                 Twitter:
//                 <a href="#{twitter}" target="_blank">#{}</a>
//               </h3>
//               <h3>
//                 Web:
//                 <a href="#{web}" target="_blank">#{}</a>
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
