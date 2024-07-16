import React from 'react'
import "./Loading.css"

const Loading = () => {
  return (
    <div className="skeleton-card">
        <div className="skeleton-line img"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
    </div>
  )
}

export default Loading;