import { ReactNode } from 'react';

const Markdown = ({text}: {text:string}) => {
  function addLineBreaks(txt: string) {
    let result: ReactNode[] = [];

    let texts = txt.split('\n');    
    for(let i=0; i < texts.length; i++) {
      result.push(texts[i]);
      if(i != texts.length-1) result.push(<br key={i+texts.length}/>);
    }
    return result
  }

  function bolden(txt: string) {
    let result: ReactNode[] = [];

    let texts = txt.split('**');    
    for(let i=0; i < texts.length; i++) {
      if(i%2 == 0) result.push(<span key={i}>{addLineBreaks(texts[i])}</span>);
      else result.push(<span key={i} className='font-bold'>{addLineBreaks(texts[i])}</span>);
    }
    return result
  } 

  return <span>{bolden(text)}</span>
};

export default Markdown;