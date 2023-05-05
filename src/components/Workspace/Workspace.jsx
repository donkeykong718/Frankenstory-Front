import React, { useContext } from 'react';
import { StoryContext } from '../../App';
import LabBackdrop from '../../pages/laboratory1920a.jpg'

import Writing from './Writing'
import Drawing from './Drawing'

import './workspace.css'

export default function Workspace() {

  const { current, setCurrent } = useContext(StoryContext);

  return (
    <div style={{ backgroundImage: `url(${LabBackdrop})` }} id='desktop-container'>
      {current.turn % 2 === 0 ? <Writing story={current} /> : <Drawing story={current} />}
    </div>
  )

}