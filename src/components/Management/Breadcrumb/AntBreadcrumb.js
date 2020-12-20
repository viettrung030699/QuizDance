import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export default (props) => {
  const { elements } = props
  return (
    <Breadcrumb style={{ margin: '1rem 0' }}>
      {
        elements.map(element => 
          <Breadcrumb.Item>
            <Link to={element.to&&element.to}>{element.text}</Link>
          </Breadcrumb.Item>  
        )
      }
    </Breadcrumb>
  )
}