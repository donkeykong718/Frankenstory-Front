import './gallery.css'
import Frame from './Frame'
import Flickity from 'react-flickity-component'
import 'flickity/dist/flickity.css';



export default function Storybook({ story, isAlive }) {

  const { title, frames } = story;
  console.log('Storybook has been called')

  const flickityOptions = {
    cellAlign: 'left',
    contain: true
  }

  return (
    <Flickity
      className={'storybook js-flickity'}
      elementType={'div'}
      options={flickityOptions}
      disableImagesLoaded={false}
      reloadOnUpdate
      static
    >
      {isAlive ? <div className='frame' style={{ background: '#D2BF55' }}><p className='alive'>It's aliiiive!!!</p>
      </div> : <></>}
      <div className='frame'>{title}</div>
      {frames.map((frame, index) => (<Frame frame={frame} key={index}
      />))}
    </Flickity>

  )
}