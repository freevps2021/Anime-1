import React from 'react';
import classNames from 'classnames';
import './style.scss';
export default class HeroSlider extends React.Component {
    constructor(props) {
      super(props);
      
      this.IMAGE_PARTS = 4;
      
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;
      
      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }
    
    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }
    
    componentDidMount() {
      this.runAutochangeTO();
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }
    
    runAutochangeTO() {
      this.changeTO = setTimeout(() => {
        this.changeSlides(1);
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    }
    
    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const { length } = this.props.slides;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState({ activeSlide, prevSlide });
    }
    
    render() {
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return (
        <div className={classNames('slider', { 's--ready': sliderReady })}>
          <div className="slider__slides">
            {this.props.slides.map((slide, index) => (
              <div
                className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                key={slide.category}
                >
                <div className="slider__slide-content">
                  <h3 className="slider__slide-subheading">{slide.category || slide.title}</h3>
                  <h2 className="slider__slide-heading">
                      {/* {slide.title} */}
                    {slide.title.split('').map(l => <span>{l}</span>)}
                  </h2>
                  {/* <p className="slider__slide-readmore">Watch Now</p> */}
                  <a href={slide.link}><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                </div>
                <div className="slider__slide-parts">
                  {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                    <div className="slider__slide-part" key={i}>
                      <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="slider__control" onClick={() => this.changeSlides(-1)} />
          <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
        </div>
      );
    }
  }