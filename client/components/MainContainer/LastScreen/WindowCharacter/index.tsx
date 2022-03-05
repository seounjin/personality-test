import React from 'react';
import Wrapper from './styles';

const WindowCharacter = ({ description }): JSX.Element => {
  return (
    <Wrapper>
      <div className="content">{description}</div>
    </Wrapper>
  );
};

export default WindowCharacter;

// const WindowCharacter = ({
//     description,
//   }: windowCharacterProps): JSX.Element => {
//     return (
//       <Wrapper>
//         <div className="content">
//           {description.map((line, index) => {
//             return (
//               <span
//                 style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
//                 key={'content' + index}
//               >
//                 {line}
//                 <br />
//                 <br />
//               </span>
//             );
//           })}
//         </div>
//       </Wrapper>
//     );
//   };
