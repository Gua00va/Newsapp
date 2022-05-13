import React, {useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props)=> {
 const [articles, setarticles] = useState([])
 const [loading, setloading] = useState(true)
 const [page, setpage] = useState(0)
 const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     articles : [],
  //     loading: true,
  //     page : 1,
  //     totalResults: 0
  //   }
    
  // }
  
  
  const updateNews = async ()=>{
    props.setprogress(10);
    const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)

    props.setprogress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews()
  }, [])
  
  
  // componentDidMount = async ()=>{
  //   this.updateNews();
  // }

  // handlePreviousClick = async ()=>{
  //   this.setState({page:this.state.page - 1});
  //   this.updateNews();
  // }

  // handleNextClick = async ()=>{
  //   this.setState({page: this.state.page + 1});
  //   this.updateNews();
  // }

  const fetchMoreData = async()=>{
    setpage(page+1)
    const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9bce1584f9b348839071c6919f313fb8&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setloading(false)
  }

    return (
      <>
        <h1 className="text-center" style={{margin: "35px 0px",marginTop:"90px"}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Loading/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Loading/>}
        >
        <div className="container">
        <div className="row my-3">
        {articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })} 
        </div>
        </div>
        </InfiniteScroll> 
        {/* <div className="d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  
}

News.defaultProps= {
  country: "in",
  pageSize: 5,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News