import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LexContext, SpacesContext } from '../context'
import { Context, Box, Flex } from '@holium/design-system'
import { useParams } from 'react-router-dom'

const Dropdown = () => {
  const { spaces } = useContext(SpacesContext)
  const [space, setSpace] = useState()
  const history = useNavigate()
  const { ship, group } = useParams()


  const handleChange = (e) => {
    console.log('select: ', e)
    //   e.preventDefault()
    history('/apps/lexicon/' + e.name, { replace: true })
    setSpace('/' + e.name)
  }

  const firstContext =
  {
    type: 'group',
    name: '~dev/our',
    meta: {
      color: "#ff810a",
      picture: 'https://i.imgur.com/JRw8tTj.jpeg'
    }
  }

  const testSpaces = spaces && Object.keys(spaces).map((s, i) => {
    return {
      type: 'group',
      name: s.substring(1),   // includes a '/' in the beginning 
      meta: {
        color: spaces[s].color,
        picture: spaces[s].picture
      }
    }
  })

  // NEED isValidSpace regex lib.

  const selectSpace = (name) => {
    if (name === '/undefined/undefined' | !name) {


      const our = spaces[`/${window.ship}/our`]

      if (!spaces || !our) return firstContext

      return {
        type: 'group',
        name: our.name.substring(1),
        meta: {
          color: our.color,
          picture: our.picture
        }
      }
    }

    console.log('name', name)


    const s = spaces[name]

    console.log('s ', s)

    return {
      type: 'group',
      name: name.substring(1),
      meta: {
        color: s.color,
        picture: s.picture
      }
    }
  }

  useEffect(() => {
    console.log('testspaces', testSpaces)
    console.log('selected space: ', testSpaces?.[space])
    setSpace('/' + ship + '/' + group)
  }, [ship, group, spaces])

  return testSpaces ? (
    <>
      {/* <select onChange={handleChange}>
        { space ? <option key={0} value={space}>{space}</option> : null }

      { lex && Object.keys(lex).map((item , i) => {
        return <option key={i} value={item}>{item}</option>
      }) } */}

      {/* { spaces && Object.keys(spaces).map((item, i) => {
        return <option key={i*2} value={item?.substring(1)}>{item?.substring(1)}</option>
      }) }
      </select> */}

      {/* conditionally render firstcontext? storing in state leads to issues for now  */}

      <Flex>
        <Context availableContexts={testSpaces} selectedContext={selectSpace(space)} menuOrientation='top-left' onContextClick={handleChange} style={{ color: 'black' }} />
      </Flex>
    </>
  ) : <Context availableContexts={[firstContext]} selectedContext={firstContext} menuOrientation='top-left' onContextClick={handleChange} style={{ color: 'black' }} />

}

export default Dropdown