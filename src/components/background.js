import React, {Component} from 'react'
import Particles from 'react-tsparticles'

class Background extends Component{
    render() {
        return(
            <div>
                <Particles
                params={{
                  "fullScreen": {
                    "enable": false,
                    "zIndex": 0
                  },
                  "particles": {
                    "number": {
                      "value": 80,
                      "density": {
                        "enable": true,
                        "value_area": 800
                      }
                    },
                    "color": {
                      "value": "#FFFFFF"
                    },
                    "shape": {
                      "type": "circle"
                    },
                    "opacity": {
                      "value": 1,
                      "random": false,
                      "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                      }
                    },
                    "size": {
                      "value": 5,
                      "random": true,
                      "anim": {
                        "enable": true,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                      }
                    },
                    "line_linked": {
                      "enable": true,
                      "distance": 150,
                      "color": "#FFFFFF",
                      "opacity": 1,
                      "width": 1
                    },
                    "move": {
                      "enable": true,
                      "speed": 0.7,
                      "direction": "none",
                      "random": false,
                      "straight": false,
                      "out_mode": "out",
                      "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                      }
                    }
                  },
                  "retina_detect": true,
                  "background": {
                    "color": "#1A1A1D",
                    "position": "50% 50%",
                    "repeat": "no-repeat",
                    "size": "cover"
                  }
                }}/>
            </div>
        )
    }
}

export default Background
