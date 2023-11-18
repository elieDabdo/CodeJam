import React from 'react';
import Preset from '../Preset/Preset';
import './Grid.css';
import YogaVideo from '../../assets/yoga.mp4';
import TaiChiVideo from '../../assets/tai_chi.mp4';

const preset1 = {
    pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",
    title: "Yoga",
    video: YogaVideo

}

const preset2 = {
    pictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOTtKr1QiIWs7JpNhAm7qkUeF47ddjsv8pw&usqp=CAU",
    title: "Tai Chi",
    video: TaiChiVideo

}

const preset3 = {
    pictureUrl: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Stretching",
    video: YogaVideo

}

const preset4 = {
    pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",
    title: "Preset 4",
    video: YogaVideo

}

const preset5 = {
    pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",
    title: "Preset 5",
    video: YogaVideo

}

const preset6 = {
    pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",
    title: "Preset 6",
    video: YogaVideo

}

const tags = [<Preset {...preset1} />, <Preset {...preset2} />, <Preset {...preset3} />, <Preset {...preset4} />, <Preset {...preset5} />, <Preset {...preset6} />]

const Grid = () => {
    return (
        <div class="grid-container">
            {tags}
        </div>
    )
}

export default Grid;