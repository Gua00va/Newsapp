import React from 'react'

const NewsItem = (props)=>{
  let {title, description, imageUrl, newsUrl, author, date} = props;
  return (
    <div>
      <div className="card">
        <img src={imageUrl?imageUrl:"https://www.techexplorist.com/wp-content/uploads/2022/05/black-hole.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} at {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}


export default NewsItem