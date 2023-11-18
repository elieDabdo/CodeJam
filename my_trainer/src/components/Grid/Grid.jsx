import React from 'react';
import Preset from '../Preset/Preset';
import './Grid.css';

const Grid = () => {
    return (
        <div class="grid-container">
            <Preset pictureUrl="https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg" title="Preset 1" />
            <Preset pictureUrl="https://as1.ftcdn.net/v2/jpg/01/90/99/76/1000_F_190997632_qvZw0IkKXRyQxzatlpOBsSqW0WVg8SDp.jpg" title="Preset 2" />
            <Preset pictureUrl="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" title="Preset 3" />
            <Preset pictureUrl="https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg" title="Preset 4" />
            <Preset pictureUrl="https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg" title="Preset 5" />
            <Preset pictureUrl="https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg" title="Preset 6" />
        </div>
    )
}

export default Grid;