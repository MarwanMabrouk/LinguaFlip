import { Typography } from '@mui/material';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export default function Card({title,source_language,target_language}) {

    return(
        <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    //ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div
    style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
  >
    <FrontSide
      style={{
        backgroundColor: '#41669d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Ensure the height is set so that the centering works correctly
        textAlign: 'center' // This will center the text horizontally
      }}
    >
        <Typography> {source_language}</Typography>
    </FrontSide>
    <BackSide
         style={{
        backgroundColor:'#175852' ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Ensure the height is set so that the centering works correctly
        textAlign: 'center' // This will center the text horizontally
      }}
      >
      <Typography>{target_language}</Typography>
    </BackSide>
  </Flippy>
    );
}