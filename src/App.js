import React from 'react';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import Rank from './components/rank/rank.component';
import FaceRecognition from './components/face-recognition/face-recognition.component';
import SignIn from './components/sign-in/sign-in.component';
import Register from './components/register/register.component';

const app = new Clarifai.App({
  apiKey: '3dbf3dcaff994b06af1fae9a92adcd7d'
 });
 

class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box});
  }

  onInputChange = (event) => {
    // console.log('event.target.value',event.target.value);
    this.setState({input: event.target.value});
    // console.log('this.state.input',this.state.input);
  }

  onButtonSubmit = (e) => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL,
      // THE JPG
      this.state.input
      )
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
      console.log(err);
      });
  }

  onRouteChange = (routePath) => {
    if(routePath === 'signout'){
      this.setState({isSignedIn:false});
    }
    else if(routePath === 'home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route: routePath})
  }

  render(){
    const particlesParam = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      } 
    }
    return (
      <div className="App">
      <Particles className='particles' params={particlesParam} />
        <Navigation onRouteChange={this.onRouteChange}
                    isSignedIn={this.state.isSignedIn}
        />
        {
          this.state.route === 'home'?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit = {this.onButtonSubmit}
                />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            :
            (
              this.state.route === 'signin'?
              <SignIn onRouteChange={this.onRouteChange}/> :
              <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
