
//The Demothree component renders a list of draggable items styled with different background gradients, allowing users to rearrange items by dragging them vertically. 

import React, { useRef } from 'react'
import styled from 'styled-components';
import Mainbutton from '../components/Mainbutton';
import { useSprings, animated, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import clamp from 'lodash.clamp'
import swap from 'lodash-move'

// Styled components
const Container = styled.div`
  width: 100dvw;
  height: 100dvh;

  background:#F6EFBD ;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Content = styled.div`
  width: 320px;
  height: ${({ itemCount }) => itemCount * 100}px;
  position: relative;
`;

const DraggableItem = styled(animated.div)`
  position: absolute;
  width: 320px;
  height: 80px;
  transform-origin: 50% 50% 0px;
  border-radius: 5px;
  color: white;
  line-height: 40px;
  padding-left: 32px;
  font-size: 14.5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  touch-action: none;
  background: ${({ index }) => {
    switch (index) {
      case 0:
        return 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
      case 1:
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 2:
        return 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)';
      case 3:
        return 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)';
      default:
        return 'lightblue';
    }
  }};
`;




const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index) =>
    active && index === originalIndex
      ? {
          y: curIndex * 100 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === 'zIndex',
          config: (key) => (key === 'y' ? config.stiff : config.default),
        }
      : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        }

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indices as a local ref
  const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs for each item

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new data for animation
    if (!active) order.current = newOrder
  })

  return (
    <Content itemCount={items.length}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <DraggableItem
          {...bind(i)}
          key={i}
          index={i}
          style={{
            zIndex,
            boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            y,
            scale,
          }}
        >
          {items[i]}
        </DraggableItem>
      ))}
    </Content>
  )
}




const Demothree = () => {
  return (
    <Container >
     <Mainbutton to="/">Home</Mainbutton>
    <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />

  </Container>
  )
}

export default Demothree