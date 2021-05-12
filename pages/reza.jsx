import CustomScroll from 'react-custom-scroll'
import Header from '../Components/header'
import HotCollections from '../Components/HotCollections'
import Slide from '../Components/slider/slide'

export default function Home() {
  return (
    <div>
        <Header/>
        <Slide/>
        <HotCollections/>
    </div>      
  )
}
