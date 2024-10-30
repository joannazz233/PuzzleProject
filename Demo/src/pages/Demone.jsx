
//This code creates a fullscreen, swipeable image gallery. Users can swipe left or right to navigate between images, and the layout adjusts automatically with window resizing.

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Mainbutton from '../components/Mainbutton';

import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import clamp from 'lodash.clamp';

const pages = [
  
  'https://www.flinders.edu.au/content/dam/images/places/campus-locations/bedford-park.jpg/jcr:content/renditions/3200.jpg',
  'https://www.flinders.edu.au/content/dam/images/places/campus-locations/festival-plaza.jpg/jcr:content/renditions/3200.jpg',
  'https://www.flinders.edu.au/content/dam/images/places/campus-locations/tonsley.jpg/jcr:content/renditions/3200.jpg',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const Container = styled.div`
  position: relative;
  background: #F6EFBD;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Page = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const PageContent = styled(animated.div)`
  touch-action: none;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  box-shadow: 
    0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 
    0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
`;






const Viewpager = () => {

  const index = useRef(0);
  const [width, setWidth] = useState(window.innerWidth);
 

// Handle window resize to adjust width
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); 
  }, []);


  // useSprings to create spring animations for each image
  const [springs, api] = useSprings(pages.length, i => ({
    x: i * width,
    scale: 1,
    display: 'block',
  }));



// Bind drag events to the view pager for swipe functionality
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    if (active && Math.abs(mx) > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
      cancel();
    }

 
// Update spring animations based on drag movement
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' };
      const x = (i - index.current) * width + (active ? mx : 0);
      const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
      return { x, scale, display: 'block' };
    });
  });



  return (
    <Container>
      {springs.map(({ x, display, scale }, i) => (
        <Page key={i} {...bind()} style={{ display, transform: x.to(x => `translate3d(${x}px,0,0)`) }}>
          <PageContent style={{ scale, backgroundImage: `url(${pages[i]})` }} />
        </Page>
      ))}
    </Container>
  );
};

const Demone = () => {
  return (
    <Container>
     <Mainbutton to="/">Home</Mainbutton>
      <Viewpager />
    </Container>
  );
};

export default Demone;
