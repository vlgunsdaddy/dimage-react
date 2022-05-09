import React from "react";
import { Container,Dropdown } from "react-bootstrap";
import { withRouter } from "react-router";
import { getThumbnail } from "../http/image";
import MyPagination from "../components/MyPagination";
import Album from "../components/Album";
import Footer from "../components/Footer";
import { getImages } from "../http/image";

import { altPic } from '../altImage.png'

const requireContext = require.context("../pics", true, /^\.\/.*\.png$/);
const testImages = requireContext.keys().map(requireContext);
const moment = require('moment')

class Home extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      images:  [],
      albumPage:{
        totPages:1,
        currentPage: 1,
      },
      loading:true,
      order:0,
    }
    
  }

  componentDidMount = () => {
    testImages.sort(() => {return Math.random() - 0.5})
    // let images = testImages.slice(0,15)
    this.loadImages(1,15,this.state.order) 
  }

  async loadImages(curPage, pageCount, order) {
    let images;
    this.setState({loading: true})
    getImages({
      currentPage:curPage,
      pageCount:pageCount,
      order:order
    }).then((res) => {
      if (res.success) {
        // console.log(res)
        images = res.data.imageList
        images = images.map((image, index) =>{
          return {
            key:index,
            imageSrc: image.thumbnailPath,
            imageID: image.imageID,
            title:image.title,
            date:image.releaseTime,
            loading:true
          }
        })
        images.forEach(async image => {
          image.imageSrc = await this.handleImageSrc(image.imageSrc)
          image.loading = false
          this.setState({images})
          // return image
        })
        this.setState({images})
        this.setState({albumPage:{totPages:res.data.totalPages,currentPage:res.data.currentPage}})
        this.setState({loading:false})
      } 
    })
  }

  async handleImageSrc (path)  {
    let formData = new FormData()
    formData.append("path", path)
    let res = await getThumbnail( formData )
    let blob  = new Blob([res])
    let url = URL.createObjectURL(blob)
    return url 
  }

  handlePageChange = (ele) => {
    console.log(ele)
    this.setState({loading:true})
    this.loadImages(ele,15,this.state.order)
    // this.setState({images})
    this.setState({currentPage:ele})
  }
  handlePurchase = (event) => {
    event.preventDefault()
    const id = event.target.id
    this.props.history.push({
      pathname: 'purchase',
      id:`${id}`,
    })
  }

  handleDetail = (event) => {
    event.preventDefault()
    const id = event.target.id
    this.props.history.push({
      pathname: 'detail',
      id:`${id}`,
    })
  }

  render() {
    return(
      <main style={{ marginTop: "56px"}}>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Dimage</h1>
              <p className="lead text-muted">A decentralized image sharing and trading platform</p>
              <p>
                <a href="#" className="btn btn-primary my-2">Check it out</a>
              </p>
            </div>
          </div>
        </section>

        <div className="py-5 bg-light">
          <Container>
          <div className="d-flex justify-content-between py-2">
            <h2>Market Place!</h2>
            <Dropdown >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {this.state.order == 0? "Recent release" : "Most popular"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{
                        this.setState({order:0});
                        this.loadImages(1,15,0)}}>Recent release</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{
                        this.setState({order:1});
                        this.loadImages(1,15,1)}}>Most popular</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
          </div>
          </Container>

          {this.state.loading?
          <div class="d-flex justify-content-center" >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <Container> 
            <MyPagination
              totPages={this.state.albumPage.totPages}
              currentPage={this.state.albumPage.currentPage}
              pageClicked={(ele) => {this.handlePageChange(ele);}}
            >
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                this.state.images.map((image, key) => {
                  return (
                    <div className="col overflow-hiden rounded" id={key}>
                      <div className="card shadow">
                        <div className="bd-placeholder-img card-img-top " role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
                          {
                            image.loading ?
                            <div class="d-flex justify-content-center" style={{ width:"100%", height:"300px"}}>
                              <div class="spinner-border text-primary  align-self-center" role="status">
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                            :
                            <div className="thumbnail">
                              <a style={{ cursor:"pointer" }} key={key}>
                              <img  className="img-responsive rounded" 
                                style={{ width:"100%", height:"300px", objectFit:"cover"}} 
                                src={image.imageSrc} />
                              </a>
                          </div>
                          }
                          
                        </div>

                        <div className="card-body">
                          <p className="card-text text-truncate">{image.title}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button 
                                type="button"  id={image.imageID} onClick={this.handlePurchase}
                                className="btn btn-sm btn-outline-secondary"
                                >Buy</button>
                              <button 
                                type="button" id={image.imageID} onClick={this.handleDetail}
                                className="btn btn-sm btn-outline-secondary"
                                >Detail</button>
                            </div>
                            <small className="text-muted text-truncate">{moment(image.date).format("YYYY-MM-DD HH:mm:ss")}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>   
            </MyPagination>
          </Container>
          }
        </div>
        <Footer/>
      </main>
    )
  }
}

export default withRouter(Home);