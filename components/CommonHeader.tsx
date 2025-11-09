import React from 'react'
import CommonText from './CommonText'
import PROJECT_NAME from '@/consts/PROJECT_NAME'
import { MdAdd } from 'react-icons/md'
import IconButton from './IconButton'

function CommonHeader() {
  return (
    <nav>
      <CommonText level='h2'>
        {PROJECT_NAME}
      </CommonText>

      <ul>
        <li >
          <IconButton><MdAdd /></IconButton>
        </li>
      </ul>
    </nav>
  )
}

export default CommonHeader