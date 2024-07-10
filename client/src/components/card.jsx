import { Typography } from '@mui/material';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export default function FlipCard({title,sourceLanguage,targetLanguage,containerSx={},typoSx={}}) {

    return(
        <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    //ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div
   /*  style={{ width: '200px', height: '200px' }}  *//// these are optional style, it is not necessary
  >
    <FrontSide
      style={{
        backgroundColor: '#0277bd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', // This will center the text horizontally
    borderRadius: '50px' ,// This will make the edges rounded
    ...containerSx
      }}
    >
        <Typography style={{fontSize: '24px', color:'#fff',...typoSx}}> {sourceLanguage}</Typography>
    </FrontSide>
    <BackSide
         style={{
        backgroundColor:'#e1f5fe' ,
        display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', // This will center the text horizontally
    borderRadius: '50px', // This will make the edges rounded
     ...containerSx   
      }}
      >
      <Typography style={{ fontSize: '24px',...typoSx }}>{targetLanguage}</Typography>
    </BackSide>
  </Flippy>
    );
}