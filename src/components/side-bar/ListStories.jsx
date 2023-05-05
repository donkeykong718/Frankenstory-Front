import * as backendFunctions from '../../services/stories';
import { useEffect, useState, useContext } from 'react'
import { StoryContext, GameContext } from '../../App';

import CompletionCircle_1 from './side-bar assets/CompletionCircle_1.svg'
import CompletionCircle_2 from './side-bar assets/CompletionCircle_2.svg'
import CompletionCircle_3 from './side-bar assets/CompletionCircle_3.svg'
import CompletionCircle_4 from './side-bar assets/CompletionCircle_4.svg'
import CompletionCircle_5 from './side-bar assets/CompletionCircle_5.svg'
import CompletionCircle_6 from './side-bar assets/CompletionCircle_6.svg'
import CompletionCircle_7 from './side-bar assets/CompletionCircle_7.svg'

function ListStories({ story }) {

  let currentUser = JSON.parse(localStorage.getItem('user'));
  if (!currentUser) { currentUser = { _id: 0, username: 'guest' } }

  const { current, setCurrent } = useContext(StoryContext);
  const { playing, setPlaying } = useContext(GameContext)

  const [circle, setCircle] = useState();
  const [valid, setValid] = useState(true);

  const { _id, turn, frames } = story;

  useEffect(() => {
    if (currentUser.username !== 'guest') {
      let res = frames.map(x => x.user)
      if (res.includes(currentUser._id)) {
        setValid(false);
      }
    }
    else setValid(true);
  }, []);

  const openCurtains = () => {
    const curtainL = document.getElementById('curtain-L');
    const curtainR = document.getElementById('curtain-R');

    if (!playing) {
      const mainContainer = document.getElementById('main-container');

      curtainL.classList.add('slideleft');
      curtainR.classList.add('sideright');
      setTimeout(() => mainContainer.classList.add('slideup'), 1500)
    }

    curtainL.classList.add('slideleft');
    curtainR.classList.add('sideright');
  }


  const handleGetStory = async () => {
    const currentStory = await backendFunctions.getStory(_id)
    setCurrent(currentStory);
    openCurtains();
  }


  useEffect(() => {
    const { turn } = story;

    switch (turn) {
      case 1:
        setCircle(CompletionCircle_1);
        break;
      case 2:
        setCircle(CompletionCircle_1);
        break;
      case 3:
        setCircle(CompletionCircle_2);
        break;
      case 4:
        setCircle(CompletionCircle_3);
        break;
      case 5:
        setCircle(CompletionCircle_4);
        break;
      case 6:
        setCircle(CompletionCircle_5);
        break;
      case 7:
        setCircle(CompletionCircle_6);
        break;
      case 8:
        setCircle(CompletionCircle_7);
        break;
      default:
    }
  }, [story])

  return (
    <div className="story-list">
      {valid ? <><li className="current-turn"><img src={circle} className="completionCircle" alt="" />
      </li>
        <p style={{ textAlign: 'center', fontSize: '1.5em' }}>Turn # {turn} <br></br>
          {turn % 2 === 0 ? <span> writing </span> : <span> drawing </span>}
        </p>
        <button onClick={handleGetStory}>Select story</button></>
        : <>
          <li className="current-turn"><img style={{ filter: 'brightness(50%' }} src={circle} className="completionCircle" alt="" />
          </li>
          <p style={{ textAlign: 'center', fontSize: '1.25em', color: 'darkgray' }}>Not Available.<br></br>
            You already contributed.</p>
          <br></br> </>}
    </div>
  )
}

export default ListStories;