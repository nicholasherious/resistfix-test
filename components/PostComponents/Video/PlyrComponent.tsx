import { useEffect } from 'react';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';

const PlyrComponent = ({ urlSource }) => {
  const options = {
    controls: [
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
    ],
  };

  const sources = {
    type: 'video',
    sources: [
      {
        src: urlSource,
        type: 'video/mp4',
        size: 720,
      },
    ],
  };
  useEffect(() => {
    const player = new plyr('.js-plyr', options);
    player.source = sources;
    return function cleanup() {
      player.destroy();
    };
  });

  return (
    <>
      <video className='js-plyr plyr' />
    </>
  );
};

export default PlyrComponent;
